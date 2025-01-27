import { html, css, LitElement } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";

export class AkMainIndex extends LitElement {
  static styles = css`
    main {
      padding: 20px;
      color: var(--black-color);
      position: relative;

      @media screen and (min-width: 768px) {
        padding-right: calc(50% + 110px);
      }
    }

    .div-bg {
      background: linear-gradient(
        to bottom,
        var(--bg-color-main) 50%,
        color-mix(in srgb, var(--black-color) 50%, var(--bg-color-main)) 100%
      );
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;

      @media screen and (min-width: 768px) {
        background:
          linear-gradient(
            to bottom,
            transparent 50%,
            color-mix(in srgb, var(--black-color) 50%, transparent) 100%
          ),
          url("../images/back.jpeg") no-repeat bottom;
        background-size: cover;
      }
    }

    .content {
      font-size: 1.25rem;
    }
  `;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`<main>
      <div class="div-bg"></div>
      <div class="content">
        ${msg(
          html`Le groupe de danse traditionnelle
            <i><b>Angeluarrak</b></i> fêtera en 2026 ses 60 ans d'existence et
            d'engagement dans la préservation des traditions basques à travers
            la danse. Pour marquer cet anniversaire, le groupe s'associe aux
            associations angloys et organise une grande cavalcade qui
            rassemblera petits et grands dans un moment festif.`
        )}
      </div>
      <div class="content">&nbsp;</div>
      <div class="content">
        ${msg(
          html`Cet événement culturel <b>important</b> est une occasion unique
            de célébrer l'histoire d&quot;<i><b>Angeluarrak</b></i> et de
            renforcer les liens entre les différentes associations d'Anglet,
            tout en mettant à l'honneur la richesse et la diversité du
            patrimoine local. La cavalcade promet d'être un temps fort dans le
            calendrier culturel de la ville, offrant aux habitants et aux
            visiteurs une immersion dans les traditions basques à travers des
            danses, des costumes, des musiques et du théâtre.`
        )}
      </div>
    </main>`;
  }
}
customElements.define("ak-main-index", AkMainIndex);
