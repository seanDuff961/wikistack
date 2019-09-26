const express = require('express');
const router = express.Router();

const { Page } = require("../models");
const {addPage} = require('../views/index');

router.get('/', function (req, res, next) {
  res.redirect('/wiki');
});


router.get('/add', function (req, res, next) {
  res.send(addPage());

  res.redirect('/wiki');
});



router.post('/', async (req, res, next) => {

  const page = new Page ({
  title: req.body.title[0],
  content : req.body.content[2],

  });



  try {
    console.log(page);
    await page.save();
    res.redirect('/');
  } catch (error) {
    next(error) }


});


router.get('/:slug', async (req, res, next) => {

  try {
  const currentPage = await Page.findOne({
    where: {
      slug: req.params.slug,
    }
  });

  res.json(currentPage);
} catch (error) { next(error) }
});


module.exports = router;



