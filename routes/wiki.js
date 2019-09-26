const express = require('express');
const router = express.Router();

const { Page } = require("../models");
const {addPage} = require('../views/index');

const {wikiPage} = require('../views/index');

router.get('/', function (req, res, next) {
  res.redirect('/wiki');
});


router.get('/add', function (req, res, next) {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {

  const page = new Page ({
  title: req.body.title,
  content: req.body.content,

  });

  try {
    console.log(page);
    await page.save();
    res.redirect(`/wiki/${page.slug}`);

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

  res.send(wikiPage(currentPage));
  //res.send('currentPage.Title****', currentPage.title);

  } catch (error){
    next(error)
  }
});

module.exports = router;



