const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const Book = require('../../models/book');

router.get("/all-books", checkAuth, (req, res, next){
    Book.find()
    .exec()
    .then(docs => {
        const response = {
            books: docs.map(doc => {
                return {
                    title: doc.title,
                    auther: doc.auther,
                    _id: doc._id,
                    isbn: doc.isbn,
                    price: doc.price,
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get("/book-details/:bookId", checkAuth, (req, res, next) => {
    Book.find({_id:id})
    .exec()
    .then(doc => {
        const response = {
            books: docs.map(doc => {
                return {
                    title: doc.title, 
                    auther: doc.auther,
                    _id:doc.id,
                    isbn: doc.isbn,
                    price: doc.price,
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});