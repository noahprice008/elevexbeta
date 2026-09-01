/**
 * Central webhook configuration for ELEVEX.
 * All outbound integrations route through n8n.elevex.digital.
 * Each endpoint has a test and production variant; both are fired in parallel
 * so submissions are captured regardless of which n8n environment is active.
 */

export const formSubmissionTestWebhook =
  "https://n8n.elevex.digital/webhook-test/e9250990-13c1-4343-a4de-21f009dbfec8";

export const formSubmissionProductionWebhook =
  "https://n8n.elevex.digital/webhook/e9250990-13c1-4343-a4de-21f009dbfec8";

export const approveLeadTestWebhook =
  "https://n8n.elevex.digital/webhook-test/approve-lead";

export const approveLeadProductionWebhook =
  "https://n8n.elevex.digital/webhook/approve-lead";

export const rejectLeadTestWebhook =
  "https://n8n.elevex.digital/webhook-test/reject-lead";

export const rejectLeadProductionWebhook =
  "https://n8n.elevex.digital/webhook/reject-lead";

export const chatbotContactTestWebhook =
  "https://n8n.elevex.digital/webhook-test/chatbot-contact-request";

export const chatbotContactProductionWebhook =
  "https://n8n.elevex.digital/webhook/chatbot-contact-request";

/**
 * Fire a JSON payload to both the test and production endpoints for a given flow.
 * Failures are swallowed by default so the UI can remain non-blocking.
 */
export async function sendToBothEndpoints(
  testUrl: string,
  productionUrl: string,
  payload: Record<string, unknown>,
  options: { swallowErrors?: boolean } = {},
): Promise<Response[]> {
  const { swallowErrors = true } = options;
  const body = JSON.stringify(payload);
  const headers = { "Content-Type": "application/json" };

  const requests = [fetch(testUrl, { method: "POST", headers, body })];
  if (productionUrl !== testUrl) {
    requests.push(fetch(productionUrl, { method: "POST", headers, body }));
  }

  try {
    return await Promise.all(requests);
  } catch (error) {
    if (swallowErrors) {
      console.error("[Webhook] Parallel submission failed:", error);
      return [];
    }
    throw error;
  }
}
