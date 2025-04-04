import { Component, inject, signal } from '@angular/core';
import {
  Firestore,
  getDocs,
  query,
  collection,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  writeBatch,
} from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { BodySection, BodyKeyword } from '../../body/body.component';
import { AdminSectionDialogComponent } from '../admin-footer/admin-section-dialog/admin-section-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { AdminKeywordDialogComponent } from '../admin-footer/admin-keyword-dialog/admin-keyword-dialog.component';

@Component({
  selector: 'anka-admin-sections',
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
  ],
  templateUrl: './admin-sections.component.html',
  styleUrl: './admin-sections.component.css',
})
export class AdminSectionsComponent {
  #firestore = inject(Firestore);
  #matDialog = inject(MatDialog);

  sections = signal<BodySection[]>([]);
  displayedColumns: string[] = ['cardFR', 'cardEUS', 'actions'];

  async ngOnInit() {
    const bodySections: BodySection[] = [];
    const querySnapshot = await getDocs(
      query(collection(this.#firestore, 'body'), orderBy('order')),
    );
    querySnapshot.forEach((doc) => {
      const bodySection: BodySection = {
        id: doc.id,
        ...(doc.data() as any),
        keywords: [],
      };
      bodySections.push(bodySection);
    });
    for await (const bodySection of bodySections) {
      const querySnapshot = await getDocs(
        query(
          collection(this.#firestore, 'body', bodySection.id, 'keywords'),
          orderBy('order'),
        ),
      );
      querySnapshot.forEach((doc) => {
        bodySection.keywords.push({
          id: doc.id,
          ...(doc.data() as any),
        });
      });
    }
    this.sections.set(bodySections);
  }

  addSection() {
    const dialogRef = this.#matDialog.open(AdminSectionDialogComponent, {
      data: {
        mode: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const footerRef = collection(this.#firestore, 'body');
        const bodySection: Partial<BodySection> = {
          title_FR: result.title_FR,
          title_EUS: result.title_EUS,
          footer_FR: result.footer_FR,
          footer_EUS: result.footer_EUS,
          order: this.sections().length + 1,
        };
        addDoc(footerRef, bodySection).then(
          (doc) => {
            bodySection.id = doc.id;
            bodySection.keywords = [];
            this.sections.update((fs) => {
              return [...fs, bodySection as BodySection];
            });
          },
          (error) => {
            console.error('Error adding section: ', error);
          },
        );
      }
    });
  }

  addKeyword(bodySection: BodySection) {
    const dialogRef = this.#matDialog.open(AdminKeywordDialogComponent, {
      data: {
        mode: 'add',
      },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const keyboardRef = collection(
          this.#firestore,
          'body',
          bodySection.id,
          'keywords',
        );
        const keyword: Partial<BodyKeyword> = {
          card_FR: result.card_FR,
          card_EUS: result.card_EUS,
          markdown_FR: result.markdown_FR,
          markdown_EUS: result.markdown_EUS,
          imageUrl: result.imageUrl,
          order: bodySection.keywords.length + 1,
        };
        addDoc(keyboardRef, keyword).then(
          (doc) => {
            keyword.id = doc.id;
            const sectionUpdated = { ...bodySection };
            sectionUpdated.keywords = [
              ...sectionUpdated.keywords,
              keyword as BodyKeyword,
            ];
            this.sections.update((fs) => {
              return fs.map((f) => {
                if (f.id === bodySection.id) {
                  return sectionUpdated;
                }
                return f;
              });
            });
          },
          (error) => {
            console.error('Error adding keyword: ', error);
          },
        );
      }
    });
  }

  editKeyword(bodySection: BodySection, keyword: BodyKeyword) {
    const dialogRef = this.#matDialog.open(AdminKeywordDialogComponent, {
      data: {
        mode: 'edit',
        card_EUS: keyword.card_EUS,
        card_FR: keyword.card_FR,
        markdown_EUS: keyword.markdown_EUS,
        markdown_FR: keyword.markdown_FR,
        imageUrl: keyword.imageUrl,
      },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        updateDoc(
          doc(this.#firestore, 'body', bodySection.id, 'keywords', keyword.id),
          {
            card_FR: result.card_FR,
            card_EUS: result.card_EUS,
            markdown_FR: result.markdown_FR,
            markdown_EUS: result.markdown_EUS,
            imageUrl: result.imageUrl,
          },
        ).then(
          () => {
            const sectionUpdated = { ...bodySection };
            sectionUpdated.keywords = sectionUpdated.keywords.map((l) => {
              if (l.id === keyword.id) {
                return { ...l, ...result };
              }
              return l;
            });
            this.sections.update((fs) => {
              return fs.map((f) => {
                if (f.id === bodySection.id) {
                  return sectionUpdated;
                }
                return f;
              });
            });
          },
          (error) => {
            console.error('Error updating keyword: ', error);
          },
        );
      }
    });
  }

  deleteKeyword(bodySection: BodySection, keyword: BodyKeyword) {
    const dialogRef = this.#matDialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete the keyword "${keyword.card_FR}" / "${keyword.card_EUS}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        deleteDoc(
          doc(this.#firestore, 'body', bodySection.id, 'keywords', keyword.id),
        ).then(
          () => {
            const sectionUpdated = { ...bodySection };
            sectionUpdated.keywords = bodySection.keywords.filter(
              (l) => l.id !== keyword.id,
            );
            this.sections.update((fs) => {
              return fs.map((f) => {
                if (f.id === bodySection.id) {
                  return sectionUpdated;
                }
                return f;
              });
            });
          },
          (error) => {
            console.error('Error deleting keyword: ', error);
          },
        );
      }
    });
  }

  deleteSection(bodySection: BodySection) {
    const dialogRef = this.#matDialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete the section "${bodySection.title_FR}" / "${bodySection.title_EUS}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        deleteDoc(doc(this.#firestore, 'body', bodySection.id)).then(
          () => {
            this.sections.update((fs) => {
              return fs.filter((f) => f.id !== bodySection.id);
            });
          },
          (error) => {
            console.error('Error deleting section: ', error);
          },
        );
      }
    });
  }

  editSection(bodySection: BodySection) {
    const dialogRef = this.#matDialog.open(AdminSectionDialogComponent, {
      data: {
        mode: 'edit',
        title_FR: bodySection.title_FR,
        title_EUS: bodySection.title_EUS,
        footer_FR: bodySection.footer_FR,
        footer_EUS: bodySection.footer_EUS,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        updateDoc(doc(this.#firestore, 'body', bodySection.id), {
          title_FR: result.title_FR,
          title_EUS: result.title_EUS,
          footer_FR: result.footer_FR,
          footer_EUS: result.footer_EUS,
        }).then(
          () => {
            const sectionUpdated = { ...bodySection };
            sectionUpdated.title_FR = result.title_FR;
            sectionUpdated.title_EUS = result.title_EUS;
            sectionUpdated.footer_FR = result.footer_FR;
            sectionUpdated.footer_EUS = result.footer_EUS;
            this.sections.update((fs) => {
              return fs.map((f) => {
                if (f.id === bodySection.id) {
                  return sectionUpdated;
                }
                return f;
              });
            });
          },
          (error) => {
            console.error('Error updating section: ', error);
          },
        );
      }
    });
  }

  moveSectionUp(bodySection: BodySection) {
    const index = this.sections().findIndex((s) => s.id === bodySection.id);
    if (index > 0) {
      const previousSection = this.sections()[index - 1];
      this.updateSectionOrder(bodySection, previousSection, index, index - 1);
    }
  }

  moveSectionDown(bodySection: BodySection) {
    const index = this.sections().findIndex((s) => s.id === bodySection.id);
    if (index < this.sections().length - 1) {
      const nextSection = this.sections()[index + 1];
      this.updateSectionOrder(bodySection, nextSection, index, index + 1);
    }
  }

  updateSectionOrder(
    bodySection: BodySection,
    otherSection: BodySection,
    index: number,
    otherIndex: number,
  ) {
    const batch = writeBatch(this.#firestore);
    batch.update(doc(this.#firestore, 'body', bodySection.id), {
      order: otherSection.order,
    });
    batch.update(doc(this.#firestore, 'body', otherSection.id), {
      order: bodySection.order,
    });
    batch
      .commit()
      .then(() => {
        const bodySectionOrder = bodySection.order;
        this.sections.update((fs) => {
          const updatedSections = [...fs];
          updatedSections[index].order = otherSection.order;
          updatedSections[otherIndex].order = bodySectionOrder;
          return updatedSections.sort((a, b) => a.order! - b.order!);
        });
      })
      .catch((error) => {
        console.error('Error updating section order: ', error);
      });
  }

  moveLinkUp(bodySection: BodySection, keyword: BodyKeyword) {
    const index = bodySection.keywords.findIndex((s) => s.id === keyword.id);
    if (index > 0) {
      const previousKeyword = bodySection.keywords[index - 1];
      this.updateLinkOrder(
        bodySection,
        keyword,
        previousKeyword,
        index,
        index - 1,
      );
    }
  }

  moveLinkDown(bodySection: BodySection, keyword: BodyKeyword) {
    const index = bodySection.keywords.findIndex((s) => s.id === keyword.id);
    if (index < bodySection.keywords.length - 1) {
      const nextKeyword = bodySection.keywords[index + 1];
      this.updateLinkOrder(bodySection, keyword, nextKeyword, index, index + 1);
    }
  }

  updateLinkOrder(
    bodySection: BodySection,
    keyword: BodyKeyword,
    otherKeyword: BodyKeyword,
    index: number,
    otherIndex: number,
  ) {
    const batch = writeBatch(this.#firestore);
    batch.update(
      doc(this.#firestore, 'body', bodySection.id, 'keywords', keyword.id),
      {
        order: otherKeyword.order,
      },
    );
    batch.update(
      doc(this.#firestore, 'body', bodySection.id, 'keywords', otherKeyword.id),
      {
        order: keyword.order,
      },
    );
    batch
      .commit()
      .then(() => {
        const keywordOrder = keyword.order;
        this.sections.update((fs) => {
          const updatedSections = [...fs];
          const updatedKeywords = [...bodySection.keywords];
          updatedKeywords[index].order = otherKeyword.order;
          updatedKeywords[otherIndex].order = keywordOrder;
          updatedSections.forEach((section) => {
            if (section.id === bodySection.id) {
              section.keywords = updatedKeywords.sort(
                (a, b) => a.order! - b.order!,
              );
            }
          });
          return updatedSections;
        });
      })
      .catch((error) => {
        console.error('Error updating link order: ', error);
      });
  }
}
