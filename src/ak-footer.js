import { html, css, LitElement } from "lit";
import { msg, updateWhenLocaleChanges } from "@lit/localize";

export class AkFooter extends LitElement {
  static styles = css`
    footer {
      background-color: var(--bg-color-footer);
      padding: 1em;
      min-height: 120px;
      display: flex;
      flex-direction: column;

      @media screen and (min-width: 768px) {
        flex-direction: row;
        justify-content: space-around;
      }

      h3 {
        color: var(--red-color);
      }

      ul {
        list-style: none;
        padding: 0;
        color: var(--grey-color);
        margin-top: 0;

        li {
          display: inline-block;

          a {
            color: inherit;
            text-decoration: none;
            margin-left: 25px;

            &:hover,
            &:focus-visible {
              text-decoration: underline;
            }
          }
        }
      }
    }
  `;

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`<footer>
      <div>
        <h3>${msg("Références")}</h3>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://www.eke.eus/fr/culture-basque/theatre-basque/charivaris-ou-toberak"
              >${msg("Les charivaris ou Toberak")}</a
            >
          </li>
        </ul>
      </div>
      <div>
        <h3>${msg("Actualités")}</h3>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://gureirratia.eus/berriak/4229-_kabalkadaren_helburua_da_angeluko_jendea_elkartzea_eta_denen_artean_euskara_sustengatu_eta_plazaratzea_"
              >${msg(
                "Le but de la cavalcade est de rassembler les habitants d'Anglet... (Gure Irratia)"
              )}</a
            >
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.mediabask.eus/fr/info_mbsk/20250113/anglet-aura-sa-cavalcade-en-septembre"
              >${msg(
                "Anglet aura sa cavalcade en septembre 2026 (mediabask)"
              )}</a
            >
          </li>
        </ul>
      </div>
      <div>
        <h3>${msg("Communautés")}</h3>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://www.instagram.com/angeluko_kabalkada/?igsh=dXgyb3VweGV0N3lr"
              >Instagram</a
            >
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.facebook.com/people/Angeluko-Kabalkada/61571618303612/?mibextid=LQQJ4d&rdid=D5bRI0r7KI6lMrj2&share_url=https://www.facebook.com/share/1BFLgUouEf/?mibextid=LQQJ4d"
              >Facebook</a
            >
          </li>
        </ul>
      </div>
    </footer>`;
  }
}
customElements.define("ak-footer", AkFooter);
