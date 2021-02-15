export class Student {
    constructor(firstName, lastName, iNumber, favoriteBooks=[]) {
        this.Id = Date.now(),
        this.CreatedDate = new Date(),
        this.FirstName = firstName,
        this.LastName = lastName,
        this.INumber = iNumber;
        this.FavoriteBooks = favoriteBooks;
    }
}