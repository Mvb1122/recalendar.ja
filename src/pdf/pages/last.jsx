import { Page, Text, View, Link, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import React from 'react';
import { withTranslation, Trans } from 'react-i18next';

import PdfConfig from '~/pdf/config';
import { pageStyle } from '~/pdf/styles';

class LastPage extends React.Component {
	styles = StyleSheet.create(
		Object.assign(
			{
				center: {
					flexDirection: 'column',
					height: '100%',
					padding: '0 10',
				},
				title: {
					marginTop: 'auto',
					fontSize: 15,
					textAlign: 'center',
				},
				subtitle: {
					fontSize: 10,
					textAlign: 'center',
					marginBottom: 20,
				},
			},
			{ page: pageStyle( this.props.config ) },
		),
	);

	render() {
		const { config, t } = this.props;
		return (
			<Page size={ config.pageSize } dpi={ config.dpi }>
				<View style={ this.styles.page }>
					<View style={ this.styles.center }>
						<Text style={ this.styles.title }>
							<Trans
								i18nKey="page.last.title"
								components={ {
									recalendar: <Link src="https://recalendar.me" />,
								} }
							/>
						</Text>
						<Text style={ this.styles.subtitle }>{t( 'page.last.subtitle' )}</Text>
					</View>
				</View>
			</Page>
		);
	}
}

LastPage.propTypes = {
	config: PropTypes.instanceOf( PdfConfig ).isRequired,
	t: PropTypes.func.isRequired,
};

export default withTranslation( 'pdf' )( LastPage );
