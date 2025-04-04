import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  orderBy,
  query,
  updateDoc,
  writeBatch,
} from '@angular/fire/firestore';
import { FooterLink, FooterSection } from '../../footer/footer.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AdminFooterSectionDialogComponent } from './admin-footer-section-dialog/admin-footer-section-dialog.component';
import { AdminFooterLinkDialogComponent } from './admin-footer-link-dialog/admin-footer-link-dialog.component';

@Component({
  selector: 'anka-admin-footer',
  imports: [
    MatExpansionModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './admin-footer.component.html',
  styleUrl: './admin-footer.component.css',
})
export class AdminFooterComponent {
  #firestore = inject(Firestore);
  #matDialog = inject(MatDialog);

  footerSections = signal<FooterSection[]>([]);
  displayedColumns: string[] = [
    'labelFR',
    'labelEUS',
    'url',
    'urlFR',
    'urlEUS',
    'actions',
  ];

  async ngOnInit() {
    const footerSections: FooterSection[] = [];
    const querySnapshot = await getDocs(
      query(collection(this.#firestore, 'footer'), orderBy('order')),
    );
    querySnapshot.forEach((doc) => {
      const footerSection: FooterSection = {
        id: doc.id,
        ...(doc.data() as any),
        links: [],
      };
      footerSections.push(footerSection);
    });
    for await (const footerSection of footerSections) {
      const querySnapshot = await getDocs(
        query(
          collection(this.#firestore, 'footer', footerSection.id, 'links'),
          orderBy('order'),
        ),
      );
      querySnapshot.forEach((doc) => {
        footerSection.links.push({
          id: doc.id,
          ...(doc.data() as any),
        });
      });
    }
    this.footerSections.set(footerSections);
  }

  addFooterSection() {
    const dialogRef = this.#matDialog.open(AdminFooterSectionDialogComponent, {
      data: {
        mode: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const footerRef = collection(this.#firestore, 'footer');
        const footerSection: Partial<FooterSection> = {
          title_FR: result.title_FR,
          title_EUS: result.title_EUS,
          order: this.footerSections().length + 1,
        };
        addDoc(footerRef, footerSection).then(
          (doc) => {
            footerSection.id = doc.id;
            footerSection.links = [];
            this.footerSections.update((fs) => {
              return [...fs, footerSection as FooterSection];
            });
          },
          (error) => {
            console.error('Error adding footer section: ', error);
          },
        );
      }
    });
  }

  addLink(footerSection: FooterSection) {
    const dialogRef = this.#matDialog.open(AdminFooterLinkDialogComponent, {
      data: {
        mode: 'add',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const linkRef = collection(
          this.#firestore,
          'footer',
          footerSection.id,
          'links',
        );
        const link: Partial<FooterLink> = {
          title_FR: result.title_FR,
          title_EUS: result.title_EUS,
          url: result.url,
          url_FR: result.url_FR,
          url_EUS: result.url_EUS,
          order: footerSection.links.length + 1,
        };
        addDoc(linkRef, link).then(
          (doc) => {
            link.id = doc.id;
            const footerSectionUpdated = { ...footerSection };
            footerSectionUpdated.links = [
              ...footerSectionUpdated.links,
              link as FooterLink,
            ];
            this.footerSections.update((fs) => {
              return fs.map((f) => {
                if (f.id === footerSection.id) {
                  return footerSectionUpdated;
                }
                return f;
              });
            });
          },
          (error) => {
            console.error('Error adding link: ', error);
          },
        );
      }
    });
  }

  editLink(footerSection: FooterSection, link: FooterLink) {
    const dialogRef = this.#matDialog.open(AdminFooterLinkDialogComponent, {
      data: {
        mode: 'edit',
        title_FR: link.title_FR,
        title_EUS: link.title_EUS,
        url: link.url,
        url_FR: link.url_FR,
        url_EUS: link.url_EUS,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        updateDoc(
          doc(this.#firestore, 'footer', footerSection.id, 'links', link.id),
          {
            title_FR: result.title_FR,
            title_EUS: result.title_EUS,
            url: result.url,
            url_FR: result.url_FR,
            url_EUS: result.url_EUS,
          },
        ).then(
          () => {
            const footerSectionUpdated = { ...footerSection };
            footerSectionUpdated.links = footerSectionUpdated.links.map((l) => {
              if (l.id === link.id) {
                return { ...l, ...result };
              }
              return l;
            });
            this.footerSections.update((fs) => {
              return fs.map((f) => {
                if (f.id === footerSection.id) {
                  return footerSectionUpdated;
                }
                return f;
              });
            });
          },
          (error) => {
            console.error('Error updating link: ', error);
          },
        );
      }
    });
  }

  deleteLink(footerSection: FooterSection, link: FooterLink) {
    const dialogRef = this.#matDialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete the link "${link.title_FR}" / "${link.title_EUS}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        deleteDoc(
          doc(this.#firestore, 'footer', footerSection.id, 'links', link.id),
        ).then(
          () => {
            const footerSectionUpdated = { ...footerSection };
            footerSectionUpdated.links = footerSection.links.filter(
              (l) => l.id !== link.id,
            );
            this.footerSections.update((fs) => {
              return fs.map((f) => {
                if (f.id === footerSection.id) {
                  return footerSectionUpdated;
                }
                return f;
              });
            });
          },
          (error) => {
            console.error('Error deleting link: ', error);
          },
        );
      }
    });
  }

  deleteFooterSection(footerSection: FooterSection) {
    const dialogRef = this.#matDialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete the footer section "${footerSection.title_FR}" / "${footerSection.title_EUS}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        deleteDoc(doc(this.#firestore, 'footer', footerSection.id)).then(
          () => {
            this.footerSections.update((fs) => {
              return fs.filter((f) => f.id !== footerSection.id);
            });
          },
          (error) => {
            console.error('Error deleting footer section: ', error);
          },
        );
      }
    });
  }

  editSection(footerSection: FooterSection) {
    const dialogRef = this.#matDialog.open(AdminFooterSectionDialogComponent, {
      data: {
        mode: 'edit',
        title_FR: footerSection.title_FR,
        title_EUS: footerSection.title_EUS,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        updateDoc(doc(this.#firestore, 'footer', footerSection.id), {
          title_FR: result.title_FR,
          title_EUS: result.title_EUS,
        }).then(
          () => {
            const footerSectionUpdated = { ...footerSection };
            footerSectionUpdated.title_FR = result.title_FR;
            footerSectionUpdated.title_EUS = result.title_EUS;
            this.footerSections.update((fs) => {
              return fs.map((f) => {
                if (f.id === footerSection.id) {
                  return footerSectionUpdated;
                }
                return f;
              });
            });
          },
          (error) => {
            console.error('Error updating footer section: ', error);
          },
        );
      }
    });
  }

  moveSectionUp(footerSection: FooterSection) {
    const index = this.footerSections().findIndex(
      (s) => s.id === footerSection.id,
    );
    if (index > 0) {
      const previousSection = this.footerSections()[index - 1];
      this.updateSectionOrder(footerSection, previousSection, index, index - 1);
    }
  }

  moveSectionDown(footerSection: FooterSection) {
    const index = this.footerSections().findIndex(
      (s) => s.id === footerSection.id,
    );
    if (index < this.footerSections().length - 1) {
      const nextSection = this.footerSections()[index + 1];
      this.updateSectionOrder(footerSection, nextSection, index, index + 1);
    }
  }

  updateSectionOrder(
    footerSection: FooterSection,
    otherSection: FooterSection,
    index: number,
    otherIndex: number,
  ) {
    console.log(
      'updateSectionOrder',
      footerSection,
      otherSection,
      index,
      otherIndex,
    );
    const batch = writeBatch(this.#firestore);
    batch.update(doc(this.#firestore, 'footer', footerSection.id), {
      order: otherSection.order,
    });
    batch.update(doc(this.#firestore, 'footer', otherSection.id), {
      order: footerSection.order,
    });
    batch
      .commit()
      .then(() => {
        const footerSectionOrder = footerSection.order;
        this.footerSections.update((fs) => {
          const updatedSections = [...fs];
          updatedSections[index].order = otherSection.order;
          updatedSections[otherIndex].order = footerSectionOrder;
          return updatedSections.sort((a, b) => a.order! - b.order!);
        });
      })
      .catch((error) => {
        console.error('Error updating footer section order: ', error);
      });
  }

  moveLinkUp(footerSection: FooterSection, link: FooterLink) {
    const index = footerSection.links.findIndex((s) => s.id === link.id);
    if (index > 0) {
      const previousLink = footerSection.links[index - 1];
      this.updateLinkOrder(footerSection, link, previousLink, index, index - 1);
    }
  }

  moveLinkDown(footerSection: FooterSection, link: FooterLink) {
    const index = footerSection.links.findIndex((s) => s.id === link.id);
    if (index < footerSection.links.length - 1) {
      const nextLink = footerSection.links[index + 1];
      this.updateLinkOrder(footerSection, link, nextLink, index, index + 1);
    }
  }

  updateLinkOrder(
    footerSection: FooterSection,
    link: FooterLink,
    otherLink: FooterLink,
    index: number,
    otherIndex: number,
  ) {
    const batch = writeBatch(this.#firestore);
    batch.update(
      doc(this.#firestore, 'footer', footerSection.id, 'links', link.id),
      {
        order: otherLink.order,
      },
    );
    batch.update(
      doc(this.#firestore, 'footer', footerSection.id, 'links', otherLink.id),
      {
        order: link.order,
      },
    );
    batch
      .commit()
      .then(() => {
        const keywordOrder = link.order;
        this.footerSections.update((fs) => {
          const updatedSections = [...fs];
          const updatedKeywords = [...footerSection.links];
          updatedKeywords[index].order = otherLink.order;
          updatedKeywords[otherIndex].order = keywordOrder;
          updatedSections.forEach((section) => {
            if (section.id === footerSection.id) {
              section.links = updatedKeywords.sort(
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
