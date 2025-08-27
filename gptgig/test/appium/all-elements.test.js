describe('UI inputs and buttons', () => {
  it('should interact with every input and button', async () => {
    await browser.url('http://localhost:8100');
    const inputs = await $$('input');
    for (const input of inputs) {
      await input.click();
      await input.setValue('test');
    }
    const buttons = await $$('button');
    for (const button of buttons) {
      await button.click();
    }
  });
});
