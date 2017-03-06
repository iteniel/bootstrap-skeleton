$( document ).ready(function() {
    var people = {
        people: [
            { id: 1, firstName: "Istvan", lastName: "Toth", username: "iteniel" },
            { id: 2, firstName: "Dragan", lastName: "Remes", username: "relaxpn" }  
        ],
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.render();
        },
        cacheDom: function () {
            this.$el = $("#peopleModule");
            this.$tbody = this.$el.find("tbody");
            this.$addPersonForm = this.$el.find("form#addPerson");
            this.$addPersonModal = this.$el.find("#addPersonModal"); 
            this.templete = this.$el.find("#peopleTemplate").html();
        },
        bindEvents: function () {
            this.$addPersonForm.on("submit", this.addPerson.bind(this));
            this.$tbody.delegate("button.del", "click", this.removePerson.bind(this)); 
        },
        render: function () {
            if (this.people.length) {
                var data = { people: this.people};
            } else {
                var data = { noResult: { message: "No Result !!!"}};
            }
            this.$tbody.html(Mustache.render(this.templete, data));
        },
        addPerson: function (event) {
            event.preventDefault();
            var data = this.serializeObject(this.$addPersonForm.serializeArray());
            this.people.push(data);
            this.$addPersonModal.modal("toggle");
            this.render();
            this.$addPersonForm.get(0).reset();
        },
        removePerson: function (event) {
            var $remove = $(event.target).closest("tr");
            var i = this.$tbody.find("tr").index($remove);
            this.people.splice(i, 1);
            this.render();
        },
        serializeObject: function (array) {
            var json = {};
            $.each(array, function() {
                json[this.name] = this.value || '';
            });
            return json;
        },
    };
    people.init();
});




