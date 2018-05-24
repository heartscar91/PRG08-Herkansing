# Herkansing OP8 (Leerjaar 2)

## Over

Dit project is gemaakt voor Programmeren OP4, van leerjaar 2. Je speelt in deze game een hero, die enemies moet verslaan. Alles wat momenteel gecomment staat in de code, werkt nog niet.

### Controls

- Je kan lopen door middel van de pijltjestoetsen.
- Je kan aanvallen door middel van de spatiebalk ( werkt nog niet helemaal, voor nu kan je op beide sprites klikken ).
- Je kan je inventory openen door middel van de I toets.

## Door

Dit project is gemaakt door Roy Sijnesael uit MT3B. 

## Installatie

Qua installatie hoeft er niks te gebeuren, je hoeft alleen het project te clonen en de index.html in de dist folder te openen.

## Klassendiagram (UML)

![UML](./dist/images/uml.png?raw=true "UML")

## Programmeerprincipes

### Interface

Ik gebruik de iDrawable interface (te vinden in het mapje interfaces). Deze wordt gebruikt als blueprint voor het 'tekenen' van de sprites.

### Static Utility Method

Ik gebruik een static method (getInstance) voor de Singleton.

### Singleton

Ik heb de Game Class, een singleton gemaakt. Deze is door middel van `let g = Game.getInstance();`.

### Encapsulation

Ik gebruik bij elke class in mijn game `public`, `private`, en `protected`.

### Inheritance

`class Enemy extends gameObject { }`