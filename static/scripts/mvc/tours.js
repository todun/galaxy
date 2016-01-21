define(["libs/bootstrap-tour"],function(){var a={storage:window.sessionStorage,onEnd:function(){sessionStorage.removeItem("activeGalaxyTour")},delay:150,orphan:!0},b=function(a){return _.each(a.steps,function(a){a.preclick&&(a.onShow=function(){_.each(a.preclick,function(a){$(a).click()})}),a.postclick&&(a.onHide=function(){_.each(a.postclick,function(a){$(a).click()})}),a.textinsert&&(a.onShown=function(){$(a.element).val(a.textinsert).trigger("change")})}),a};if("undefined"!=typeof Galaxy)var c=Galaxy.root;else var c="/";var d=Backbone.Model.extend({urlRoot:c+"api/tours"}),e=Backbone.Collection.extend({url:c+"api/tours",model:d}),f=function(d){var e=c+"api/tours/"+d;$.getJSON(e,function(c){tourdata=b(c),console.log(tourdata),sessionStorage.setItem("activeGalaxyTour",JSON.stringify(c));var d=new Tour(_.extend({steps:tourdata.steps},a));d.init(),d.goTo(0),d.restart()})},g=Backbone.View.extend({initialize:function(){var a=this;this.setElement("<div/>"),this.model=new e,this.model.fetch({success:function(){a.render()},error:function(){console.error("Failed to fetch tours.")}})},render:function(){var a=_.template(["<h2>Galaxy Tours</h2>","<p>This page presents a list of interactive tours available on this Galaxy server.  ","Select any tour to get started (and remember, you can click 'End Tour' at any time).</p>","<ul>","<% _.each(tours, function(tour) { %>","<li>",'<a href="#" class="tourItem" data-tour.id=<%- tour.id %>>',"<%- tour.attributes.name || tour.id %>","</a>",' - <%- tour.attributes.description || "No description given." %>',"</li>","<% }); %>","</ul>"].join(""));this.$el.html(a({tours:this.model.models})).on("click",".tourItem",function(){f($(this).data("tour.id"))})}});return{ToursView:g,hooked_tour_from_data:b,tour_opts:a,giveTour:f}});
//# sourceMappingURL=../../maps/mvc/tours.js.map