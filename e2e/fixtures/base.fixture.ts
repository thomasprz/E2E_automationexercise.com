import { components } from "../fixtures/components.fixture";
import { pages } from '../fixtures/pages.fixture'
import { mergeTests } from "@playwright/test";

export const test = mergeTests(components, pages)

export {expect} from '@playwright/test'