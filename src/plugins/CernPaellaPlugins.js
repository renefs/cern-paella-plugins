import { PluginModule } from 'paella-core';
import packageData from '../../package.json';

export default class TutorialPlugins extends PluginModule {
    get moduleName() {
        return 'cern-paella-plugins';
    }

    get moduleVersion() {
        return packageData.version;
    }

}
