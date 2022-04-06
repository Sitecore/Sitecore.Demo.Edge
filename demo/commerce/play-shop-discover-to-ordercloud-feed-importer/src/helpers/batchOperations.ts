/**
 * @description performs an asynchronous operation on a list of inputs in
 * batches until all inputs have been operated upon
 *
 * @param inputs array of inputs that will be fed to the operation
 * @param operation the function that will operate on the list of inputs
 * until all inputs have been processed. Error handling should be handled by
 * the provided function
 * @param batchSize the max number of items that will be processed in parallel. defaults to 100
 *
 */
export async function batchOperations<InputType = any, ReturnType = any>(
  inputs: InputType[],
  // eslint-disable-next-line no-unused-vars
  operation: (input: InputType) => Promise<ReturnType>,
  batchSize = 100
): Promise<ReturnType[]> {
  let results: ReturnType[] = [];

  async function runNextBatch(): Promise<ReturnType[]> {
    // run one batch
    const batch = inputs.splice(0, batchSize);
    const requests = batch.map(async (input) => {
      try {
        return await operation.call(null, input);
      } catch (e) {
        // swallow error so it doesn't stop execution
        // if you want to capture errors, do it on the
        // function that gets passed in as an operation
      }
    });

    // add batch results to all results
    const batchResults = await Promise.all(requests);
    const batchResultsNoUndefined = batchResults.filter(
      (x) => x !== undefined // can be undefined on errors
    ) as ReturnType[];
    results = [...(results || []), ...batchResultsNoUndefined];

    // if no inputs left, return all results else run next batch
    if (inputs.length) {
      return await runNextBatch();
    } else {
      return results;
    }
  }
  return await runNextBatch();
}
