export const encodeETag = (version: number, id: string) => {
  const toEncode = id + '_' + version + '_' + process.env.ETAG_SECRET;

  const ETag = Buffer.from(toEncode).toString('base64');
  return ETag;
};
