const multer = require("multer");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});

var upload = multer({ storage:  storage }).single('songimage');

uploadSongImage = (req, res, next) => {
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).send(err);
		} else if (err) {
			return res.status(500).send(err);
		} else {
			return res.status(200).send(req.file);
		}
	});
}

getSongs = (req, res, next) => {
	var query = req.models.Songs.find();
	query.exec().then((songs) => {
		return res.send({
			"songs": songs,
			"message": `Songs retrieved successfully!`
		});
	}).catch((error) => {
    next(error);
		return res.send({
			"error": error
		});
	})
}

getSongById = (req, res, next) => {
	req.models.Songs.findById(req.params.id).then((song) => {
		return res.send({
			"song": song,
			"message": `${song.title} fetched successfully!`
		});
	}).catch((error) => {
    next(error);
		return res.send({
			"error": error
		});
	})
}

addSongToList = (req, res, next) => {
	req.models.Songs.create({
		title: req.body.title,
		artists: req.body.artists,
		img: req.body.img
	}).then((song) => {
		return res.status(201).send({
			"song": song,
			"message": `${song.title} added successfully!`
		});
	}).catch((error) => {
		next(error);
		return res.send({
			"error": error
		});
	})
}

updateSongById = (req, res, next) => {
	req.models.Songs.updateOne({_id: req.params.id}, {
		title: req.body.title,
		artists: req.body.artists,
		img: req.body.img
	}, {
		new: true,
		upsert: true,
		runvalidators: true
	}).then((status) => {
	if (status.upserted) {
		res.status(201).send({
			"message": `${req.body.title} added successfully!`
		});
    } else if (status.nModified) {
      res.status(200).send({
		"message": `${req.body.title} updated successfully!`
	  });
    } else {
      res.status(204).send({
		"message": `Don't know what happened!`
	  });
    }
  }).catch((error) => {
    next(error);
	return res.send({
		"error": error
	});
  })
}

deleteSongById = (req, res, next) => {
  req.models.Songs.findByIdAndDelete(
    { _id: req.params.id }
  ).then((song) => {
    if (song) {
		return res.status(200).send({
		  "message": `${song.title} has been removed!`
	  });
	}
    res.sendStatus(204)
  }).catch((error) => {
    next(error);
	return res.send({
		"error": error
	});
  })
}

module.exports = {
  uploadSongImage,
  getSongs,
  getSongById,
  addSongToList,
  updateSongById,
  deleteSongById
};
