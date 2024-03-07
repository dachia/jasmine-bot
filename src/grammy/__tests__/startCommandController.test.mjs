import { grammy, outgoingRequests, generateMessage } from "../../utils/testGrammy.mjs";

describe.skip("startCommandController", () => {
  it("should reply with a message", async () => {
    await grammy.handleUpdate(generateMessage("/start"));
    expect(outgoingRequests).to.have.length(1);
    expect(outgoingRequests[0].method).to.equal("sendMessage");
    expect(outgoingRequests[0].payload.text).to.equal(
      "Hi. Let's gather get your biometric data so I can help you better.\nWhat is your birth date? (YYYY-MM-DD)"
    );
  });
})