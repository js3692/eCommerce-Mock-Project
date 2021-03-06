app.config(function ($stateProvider) {
	$stateProvider.state('animal', {
		url: '/animal/:id',
		templateUrl: 'js/animal/animal.html',
		resolve: {
			animal: function (Animal, $stateParams, DS) {
				DS.ejectAll('animals');
				return Animal.find($stateParams.id);
			},
			reviews: function (Review) {
				return Review.findAll();
			},
			users: function (User) {
				return User.findAll();
			},
			cart: function (Cart) {
				return Cart.me().then(function (res) {
					return res.data;
				});
			},
			recommendations: function (Recommendation, $stateParams, DS) {
				DS.ejectAll('recommendations');
				return Recommendation.find($stateParams.id);
			}
		},
		controller: "AnimalCtrl"
	})
});