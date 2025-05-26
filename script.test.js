/**
 * @jest-environment jsdom
 */

describe("Transaction functionality", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="desc" />
      <input id="amount" />
      <button id="incomeBtn"></button>
      <button id="expenseBtn"></button>
      <button id="resetBtn"></button>
      <ul id="incomeList"></ul>
      <ul id="expenseList"></ul>
      <ul id="transactionList"></ul>
      <span id="balance"></span>
    `;

    // Viktigt: efter DOM skapats!
    jest.resetModules(); // rensa cache
    require("./src/script.js");// nu laddas scriptet med DOM tillgänglig
  });

  it("adds an income and updates balance", () => {
    const descInput = document.getElementById("desc");
    const amountInput = document.getElementById("amount");
    const incomeBtn = document.getElementById("incomeBtn");

    descInput.value = "Lön";
    amountInput.value = "1000";
    incomeBtn.click();

    expect(document.getElementById("incomeList").textContent)
      .toContain("Lön - 1000 kr (Inkomst)");
    expect(document.getElementById("balance").textContent).toBe("1000");
  });

  it("adds an expense and updates balance", () => {
    const descInput = document.getElementById("desc");
    const amountInput = document.getElementById("amount");
    const incomeBtn = document.getElementById("incomeBtn");
    const expenseBtn = document.getElementById("expenseBtn");

    // Lägg först till en inkomst (1000)
    descInput.value = "Lön";
    amountInput.value = "1000";
    incomeBtn.click();

    // Sen lägg till en utgift (200)
    descInput.value = "Hyra";
    amountInput.value = "200";
    expenseBtn.click();

    expect(document.getElementById("expenseList").textContent)
      .toContain("Hyra - -200 kr (Utgift)");
    expect(document.getElementById("balance").textContent).toBe("800");
  });
});
