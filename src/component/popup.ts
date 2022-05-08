import { css, customElement, html, LitElement, unsafeHTML } from '@conectate/ct-lit';
import { property } from 'lit/decorators.js';
import Cookies from 'js-cookie'
import "./close";

@customElement('popup-component')
export class Popup extends  LitElement {

	static styles = [
		css`
            *, *:before, *:after {
                box-sizing: inherit;
            }

			:host{
				position: absolute;
                display: block;
                height: 350px;
                width: 85%;
                background-color: #2a5abc;
                left: 0; 
                right: 0; 
                top: 0;
                bottom: 0;
                margin: auto;
                border-radius: 1em;
                padding: 1em;
                box-sizing: border-box;
			}

            @media (min-width: 500px){
                :host{
                    width: 450px;
                }
            }

            close-component{
                display: block;
                float: right;
                cursor: pointer;
            }

            .popup-title{
                display: block;
                margin: 1em 0 0 0;
                padding: 0;
                text-align: center;
                font-size: 1.5em;
                font-weight: 500;
                font-style: normal;
                color: #000;
            }

            .popup-input{
                display: block;
                padding: 0.5em 0.25em;
                margin: 0;
                width: 100%;
                border-style: solid;
                border-color: #68C382;
                border-width: 1px;
                color: #68C382;
                font-size: 1em;
            }

            .popup-input::selection{
                border-color: #68C382;
            }

            .popup-btn{
                display: block;
                width: 160px;
                padding: 0.5em 1em;
                margin: 1em auto;
                color: #fff;
                text-align: center;
                background-color: #68C382;
                border: none;
            }

            .popup-btn:hover{
                color: #68C382;
                text-align: center;
                background-color: #fff;
            }
		`
	];

	@property({ type: String }) inputValue = "";
    @property({ type: Boolean }) componentVisible = false;


    _closePopup(){

    }

    _saveName(){
        //console.log(this.inputValue);
        console.log(Cookies.set('name', this.inputValue, { expires: 7, path: '' }));
        console.log(Cookies.get('name'));   
        this._closePopup;
        this.componentVisible = false;
    }

    _getInputValue(event: Event){
        this.inputValue = unsafeHTML(event.target.value).values[0];
    }

    _getComponent(){
        if(this.componentVisible){
            return html `
                <close-component @click="${this._closePopup}"></close-component>
                <h3 class="popup-title">
                    Willkommen!
                </h3>
                <p class="popup-paragraph">
                    Willkomen bei unserer Awareness Schulung. Wir wollen dich mit deinem Namen ansprechene, 
                    deswegen bitten wir dich deinen Namen einzugeben und dann kannst du mit unserer Schulung loslegen!
                    <br><br>
                    Wir wünschen dir Viel Erfolg!
                </p>
                <input class="popup-input" type="text" @input="${this._getInputValue}" id="popup-input" placeholder="Bitte gib hier deinen Namen an" value="asdasda"/>
                <button class="popup-btn" @click="${this._saveName}">Klicken</button>
            `
        }else{
            let host = this.shadowRoot?.host
            host?.classList.add("hide-block")

            return html ``
        }
    }

	render() {



		return html`
            ${this._getComponent()}
		`;
	}
}
