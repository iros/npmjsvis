define(function(require) {

  var when = require('when');
  var Backbone = require('backbone');

  var MainLayout = require('src/modules/mobile/core/layout');
  var layout = new MainLayout();

  var DataFetcher = require('src/modules/shared/services/datafetcher');

  var Router = Backbone.Router.extend({

    routes: {
      "": "index",
      "breakdown/:breakdown": "breakdown",
      "breakdown/:breakdown/question/:question": "question",
      "about": "about"
    },

    initialize: function() {
      var self = this;

      var def = when.defer();
      self.ready = def.promise;

      self.dataFetcher = new DataFetcher('/data/stats_reduced.json');
      self.dataFetcher.then(function(data) {

        // pass data to our layout which will distribute it across
        // required views
        layout.setData(data);
        layout.render();

        // notify to all routes that we are ready.
        def.resolve(data);
      });

      // navigate if we get a routing event.
      layout.on('navigate', function(path) {
        self.navigate(path, { trigger: true });
      });
    },

    index: function() {

    },

    breakdown: function(breakdown) {

    },

    question: function(breakdown, question) {

    },

    about: function() {

    }

  });

  return Router;
});