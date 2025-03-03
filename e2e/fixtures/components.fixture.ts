import { MenuComponent } from '../components/menu.component';
import {test as componentsTest} from '@playwright/test' // Importe l'objet `test` de Playwright, et la renomme en `componentsTest` indiquant que cet objet sera utilisé avec des fixtures personnalisées.

interface Components {
    menu : MenuComponent, //Fixture appelée `menu`, qui est une instance de `MenuComponent`.
}

export const components = componentsTest.extend<Components>({
    menu: async({page}, use) => {
        await use(new MenuComponent(page))
    }
})