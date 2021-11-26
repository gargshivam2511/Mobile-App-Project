import AsyncStorage from "@react-native-async-storage/async-storage";

export var Settings = (function () {
	return {
		distanceThreshold: (function () {
			var _value = 1000;
			var _listeners = [];

			//Load the initial value from storage
			AsyncStorage.getItem("distanceThreshold").then((value) => {
				if (value != null) {
					_value = parseInt(value);
				}
				_listeners.forEach((listener) => listener(_value));
			});

			return {
				get: () => () => _value,
				set: (value) => {
					_value = value;
					AsyncStorage.setItem("distanceThreshold", value.toString()).then(
						() => {
							_listeners.forEach((listener) => listener(value));
						}
					);
				},
				addListener: (listener) => {
					_listeners.push(listener);
				}
			};
		})()
	};
})();
