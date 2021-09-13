/*
1. Работа с простыми типами
Напишите тип функции, конкатенирующей две строки
concat('Hello ', 'World') // -> Hello World;
*/

type TConcat = (a: string, b: string) => string;

const concat: TConcat = (a, b) => {
    return a + b;
}

console.log(concat('Hello ', 'World'));


/*
2. Работа с интерфейсами
Напишите интерфейс для описания следующих данных
const MyHometask = {
    howIDoIt: "I Do It Wel",
    simeArray: ["string one", "string two", 42],
    withData: [{ howIDoIt: "I Do It Wel", simeArray: ["string one", 23] }],
}
 */
interface IHomeTask {
    howIDoIt: string;
    simeArray: Array<number | string>;
}

interface IMyHomeTask extends IHomeTask {
    withData: [IHomeTask];
}

const MyHomeTask: IMyHomeTask = {
    howIDoIt: "I Do It Wel",
    simeArray: ["string one", "string two", 42],
    withData: [{
        howIDoIt: "I Do It Wel",
        simeArray: ["string one", 23]
    }],
}

console.log(MyHomeTask);

/*
3. Типизация функций, используя Generic

В уроке про Generics мы написали интерфейс массива MyArray
interface MyArray<T> {
  [N: number]: T;

добавьте типизацию для метода reduce
    reduce();
}

Справка о работе reduce
const initialValue = 0;
[1,2,3].reduce((accumulator, value) => accumulator + value, initialValue); // -> 6

Результат работы предыдущей функции передается в следующую в качестве аргумента accumulator.
На итерации 0 - accumulator === initialValue. Если initialValue не указан, то accumulator это 0 элемент массива
 */

type myReducer<T> = (accumulator: T, value: T) => T;

interface IMyArray<T> {
    [N: number]: T

    reduce<T>(callback: myReducer<T>, initialValue: T): T
}

const myArray: IMyArray<number> = [1, 2, 3],
    initialValue = 0,
    reduceResult = myArray.reduce((accumulator, value) => accumulator + value, initialValue);

console.log(reduceResult);

/*
4. Работа с MappedTypes

interface IHomeTask {
    data: string;
    numericData: number;
    date: Date;
    externalData: {
        basis: number;
        value: string;
    }
}

Стандартный generic Partial работает так же как Readonly, только для внешних ключей.

Напишите такой MyPartial, чтобы создание подобного объекта стало возможным

const homeTask: MyPartial<IHomeTask> = {
    externalData: {
        value: 'win'
    }
}

type MyPartial<T> = {
    [N in keyof T]: T[N] extends object ? MyPartial<T[N]> : T[N]
}
 */

interface IHomeTask2 {
    data: string;
    numericData: number;
    date: Date;
    externalData: {
        basis: number;
        value: string;
    }
}

type TMyPartial<T> = {
    [N in keyof T]?: T[N] extends object ? TMyPartial<T[N]> : T[N]
}

const homeTask: TMyPartial<IHomeTask2> = {
    externalData: {
        value: 'win'
    }
}

console.log(homeTask);


/*
5*. Работа с Generic, Mapped Types, Type inference №1

Это React Functional Component
function HomeComponent(props: { firstProp: string }) {
    return (
        <div>
            { props.firstProp }
        </div>
    )
}

Напишите такой тип, который извлечет тип props из этого или любого другого React компонента.
Подсказка: любой реакт компонент расширяет React.ComponentType<Props>

props: IProps;
interface IProps {
    firstProp: string
}

const t = TMyType<typeof HomeComponent>;
 */

import React from "react";

interface IProps {
    firstProp: string
}

function HomeComponent(props: IProps) {
    return React.createElement('div', null, props.firstProp);
}

type TMyType<T> = T extends React.ComponentType<infer props> ? props : never;

type TProps = TMyType<typeof HomeComponent>;

const t: TProps = {
    firstProp: 'abc'
};

console.log(t);


/*
6*. Работа с Generic, Mapped Types, Type inference №2

Дан namespace JSX. Получить к нему доступ можно после установки пакета @types/react.
Мы проделывали это в одном из первых уроков.
Среди JSX IntrinsicElements есть Элемент DIV, получить доступ к нему можно так:
type TDivElement = JSX.IntrinsicElements['div'];

Этот тип описывает все свойства, доступные для HTMLDivElement.
Напишите такой тип TGetJSXPropsProp, который извлекает все HTML свойства, доступные для любого jsx элемента.

Пример:
type TDivProps = TGetJSXPropsProp<'div'>
const props: TDivProps = {
    some: '1233' // throw error потому что не содержится в атрибутах div
    className: 'handler' // не выкидывает ошибку так как валидно для div элемента
}
 */


type TGetAllProps<T extends keyof JSX.IntrinsicElements> = {
    [n in T]: JSX.IntrinsicElements[n];
};

type TGetJSXPropsProp<T extends keyof JSX.IntrinsicElements> = Exclude<TGetAllProps<T>[keyof TGetAllProps<T>],
    React.DOMAttributes<null>>;

type TDivProps = TGetJSXPropsProp<'div'>;

const myProps: TDivProps = {
    className: 'handler',
};
