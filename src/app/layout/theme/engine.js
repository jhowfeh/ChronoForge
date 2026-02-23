import { $t } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

const presets = { Aura, Lara, Nora };

export function applyTheme({ preset, primary, surfacePalette }) {
    $t()
        .preset(presets[preset])
        .preset(primary)
        .surfacePalette(surfacePalette)
        .use({ useDefaultOptions: true });
}
