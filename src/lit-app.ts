import './base/app-router';
import { css, customElement, html, LitElement } from '@conectate/ct-lit';
import { property } from 'lit/decorators.js';
import "./component/popup";

@customElement('lit-app')
export class LitApp extends  LitElement {

	static styles = [
		css`
			:host{
				width: 100%;
				height: 100%;
			}

			header{
				display: flex;
				height: 60px;
				width: 100%;
				padding: 0;
				margin: 0;
				justify-content: space-between;
				align-items: center;
				background-color: transparent;
			}

			.header-brand{
				text-align: left;
				font-weight: 500;
				font-size: 24px;
				font-style: normal;
				line-height: normal;
			}

			.no-decoration{
				text-decoration: none;
			}

			.font-black{
				color: #000;
			}

			header ul{
				display: block;
				list-style: none;
				padding: 0;
				margin: 0;
			}

			header ul li{
				display: inline-block;
				padding: 0.25em 0.5em;
			}

			header ul li:last-child {
				padding: 0.25em 0;
			}

			.header-items{
				display: none;
			}

			.display-block{
				display: block !important;
			}

			.hide-block{
				display: none !important;
			}

			.mobile-btn{
				margin: 0;
				padding: 0;
				display: block;
				padding: 0.5em 0;
				margin: 0.5em 0.5em;
				text-align: left;
				font-size: 1.25em;
				color: #fff;
				text-decoration: none;
			}

			.mobile-btn:last-child{
				margin-bottom: 0;
			}

			.mobile-nav{
				display: none;
				background-color: #000;
				height: 100vh;
				position: absolute;
				width: 50%;
				top: 0;
				left: 0;
			}
		`
	];

	@property({ type: Number }) foo = 1;

	@property({ type: Boolean }) menuSelected = false;

	@property({type: Object}) menuNav = this.shadowRoot?.getElementById("mobile-nav");

	firstUpdated() {}
	
	show_Close_Menu(){
		
		const menuIconCss = document.getElementById("menu");
		const closeIconCss = document.getElementById("close");

		if (this.menuNav === undefined || this.menuNav === null) {
			this.menuNav = this.shadowRoot?.getElementById("mobile-nav");
		}
		
		
		if(this.menuSelected){
			menuIconCss?.classList.add("hide-block");
			closeIconCss?.classList.add("display-block");
			this.menuNav?.classList.add("display-block")
			

			return html`
				<svg id="close" @click="${this.handleMenuCloseClicked}" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" >
					<path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="black"/>
				</svg>
			`
		}else{
			this.menuNav?.classList.remove("display-block")
			return html `
				<svg id="menu" width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" @click="${this.handleMenuCloseClicked}">
					<path d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z" fill="black"/>
				</svg>
			`
		}
	}

	async handleMenuCloseClicked(){
		
		this.menuSelected = !this.menuSelected;
	}

	render() {
		return html`
			<popup-component ?componentvisible=${true}></popup-component>
			<header id="header">
				<a href="#startseite" class="header-brand no-decoration font-black">
					SafeWise
				</a>

				<ul class="header-items">
					<li class="header-item">
						<a href="#module" class="header-btn no-decoration font-black">
							Module
						</a>
					</li>
					<li class="header-item">
						<a href="#profil" class="header-btn no-decoration  font-black">
							Profile
						</a>
					</li>
				</ul>

				<div class="header-icons">

					${this.show_Close_Menu()}

				</div>
			</header>

			<div class="mobile-nav" id="mobile-nav">
				<a href="#module" class="mobile-btn ">
					Module
				</a>

				<a href="#profil" class="mobile-btn">
					Profil
				</a>
			</div>
			<app-router></app-router>

		`;
	}
}
