/** Id of the tab button for `id` in a <Tabs idPrefix={prefix}>. */
export const tabId = (prefix, id) => `${prefix}-tab-${id}`;

/** Id the caller's tabpanel element must carry so the tab's aria-controls resolves. */
export const panelId = (prefix, id) => `${prefix}-panel-${id}`;
