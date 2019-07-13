import * as download from 'download-git-repo';
import * as fs from 'fs-extra';
import { paths } from './paths';
import themeScheme from './themeScheme';

/**
 * Download the svgs source files from the
 * moxer-theme/moxer-icons repository
 */
const downloadIcons = (dest: string) => {
	download('moxer-theme/moxer-icons', dest, err => {
		console.log(
			err ? 'Error downloading icons' : 'Icons downloaded successfully'
		);
		fs.remove(`${dest}/LICENSE`);
		fs.remove(`${dest}/README.md`);
	});
};

/**
 * Build the icons theme and write the
 * theme file to the build path.
 */
const writeTheme = (scheme: object) => {
	fs.writeFile(
		// Pass the theme output path and filename
		`${paths.build}/moxer-icons.json`,
		// Pass the icon theme scheme
		JSON.stringify(scheme, null, 3),
		err => {
			if (err) {
				console.error(err);
				return;
			}
			console.log('Moxer Icons has been generated');
		}
	);
};

/**
 * Checl if the build folder exist.
 * If not, create it.
 */
// With Promises:
fs.emptyDir(paths.build, err => {
	if (err) {
		return console.error(err);
	}
	downloadIcons(paths.build);
	writeTheme(themeScheme);
});
