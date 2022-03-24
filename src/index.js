import div from './dom';

console.log("I'm mfdskfmkjdsnfjk")
console.log("dksfnkdsj")

class Element {
    constructor(element, text) {
        this.element = document.createElement(element);
        this.text = text;
        }

        append(parent, attribute, value) {
            document.getElementById(parent).appendChild(this.element);
            this.element.setAttribute(attribute, value);
            if (this.text != undefined) {
                this.element.innerHTML = this.text;
            }
            
        }


}

const header = new Element('header').append("content", "id", "header");
const main = new Element('main').append("content", "id", "main");
const title = new Element('h1', "TO-DO").append("header", "id", "title")

const nav = new Element('nav').append("header", "id", "nav");
const ul = new Element('ul').append("nav", "id", "ul")
const navItems = ["Today", "Week", "Month"]

const projectItems = ["Work", "Personal"]

navItems.forEach(item => {
    new Element('li', item).append("ul", "id", item)
})


