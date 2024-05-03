class Person {

    static basic = `
        background-size: 950px;
            height: 62px;
            width: 57px;';
    `;
    static initial(position) {
        
        return `
            ${this.basic}
            background-position: -474px -21px;
            `;
    }

    static running(position) {
        return `
            ${this.basic}
            background-position: ${position == 'right' ?  '-531px -21px' : '-362px -21px' };
        `;
    }

    static jumping(position) {
        return `
            ${this.basic}
            background-position: ${position == 'right' ?  '-594px -21px' : '-299px -21px' };
        `;
    }
    
}