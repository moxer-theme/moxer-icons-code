import * as download from 'download-git-repo';
import * as fs from 'fs-extra';
import * as path from 'path';
import themeScheme from './themeScheme';

/**
 * Define paths
 */
const paths = {
	build: path.join(__dirname, '../build'),
	src: path.join(__dirname, '.')
};

const downloadIcons = () => {
	download('moxer-theme/moxer-icons', 'build/svgs', err => {
		console.log(err ? 'Error' : 'Success');
	});
};

/**
 * Checl if the build folder exist.
 * If not, create it.
 */
if (!fs.existsSync(paths.build)) {
	fs.mkdirSync(paths.build);
	downloadIcons();
} else {
	fs.emptyDir(paths.build + '/svgs');
	downloadIcons();
}

/**
 * Build the icons theme and write the
 * theme file to the build path.
 */
fs.writeFile(
	// Pass the theme output path and filename
	`${paths.build}/moxer-icons.json`,
	// Pass the icon theme scheme
	JSON.stringify(themeScheme, null, 3),
	err => {
		if (err) {
			console.error(err);
			return;
		}
		console.log('Moxer Icons has been generated');
	}
);
