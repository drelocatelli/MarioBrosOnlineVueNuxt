class Person {

    static basic = `
        background-size: 950px;
            height: 62px;
            width: 57px;';
    `;
    static initial(position) {
        
        return `
            ${this.basic}
            background-position: -474px 0px;
            `;
    }

    static running(position) {
        return `
            ${this.basic}
            background-position: ${position == 'right' ?  '-531px 0' : '-361px 0' };
        `;
    }

    static jumping(position) {
        return `
            ${this.basic}
            background-position: ${position == 'right' ?  '-301px 0' : '-574px 0' };
        `;
    }
    
}