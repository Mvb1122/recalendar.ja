export function i18nConfiguration( namespaces ) {
	return {
		debug: process.env.NODE_ENV === 'development',
		fallbackLng: 'en',
		supportedLngs: getSupportedLocales(),
		ns: namespaces,
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
	};
}

export const webpackBackend = {
	type: 'backend',
	read: ( language, namespace, callback ) => {
		import( '../locales/' + language + '/' + namespace + '.json' )
			.then( ( resources ) => {
				callback( null, resources );
			} )
			.catch( ( error ) => {
				callback( error, null );
			} );
	},
};

export function getSupportedLocales() {
	const locales = require
		.context( '../locales', true, /app\.json$/ )
		.keys()
		.map( ( file ) => file.match( /\/(.+)\/app\.json$/ )[ 1 ] );

	const uniqueLocales = [ ...new Set( locales ) ];

	// Make sure that English is first on the list
	uniqueLocales.splice( uniqueLocales.indexOf( 'en' ), 1 );
	uniqueLocales.unshift( 'en' );
	return uniqueLocales;
}
