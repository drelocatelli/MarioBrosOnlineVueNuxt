class Functions {

    static async wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
        
}