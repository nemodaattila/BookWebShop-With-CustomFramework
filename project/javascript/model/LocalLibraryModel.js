class LocalLibraryModel {
    get book() {
        return this._book;
    }

    set book(value) {
        this._book = value;
    }
    _book={};

    checkBookInLibrary(isbn)
    {
        let prop = isbn
        return this._book[isbn];
    }

    addBookWithPrimaryData(isbn, data)
    {
        this._book[isbn] = new LocalLibraryBookModel();
        this._book[isbn].primaryData=data;
        this._book[isbn].timeStamp=new Date()
        console.log(this._book)
    }

    getOneBookPrimaryData(isbn)
    {
        console.log(isbn)
        console.log(this._book[isbn])
        if (this._book[isbn] === undefined)
            return null;
        return this._book[isbn]['primaryData']

    }

    fillBooksFromObjectLessThenOneDay(books)
    {
        let acttime=new Date()
        let keys = Object.keys(books)
        for (let isbn of keys)
        {
            console.log(isbn);
            let timeStamp=(acttime.getTime()-new Date(books[isbn]['_timeStamp']).getTime())
            console.log(timeStamp)
                if (timeStamp < 3600000)
                {
                this._book[isbn] = new LocalLibraryBookModel();
                this._book[isbn].primaryData = books[isbn]['_primaryData'];
                this._book[isbn].secundaryData = books[isbn]['_secundaryData'];
                this._book[isbn].timeStamp = new Date(books[isbn]['_timeStamp']);
            }
            console.log(this._book)

            // console.log(this._book[book].timeStamp)
        }
        console.log(this._book)
    }
}
