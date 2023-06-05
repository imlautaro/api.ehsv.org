export default eventHandler(async (event) => {
  setHeader(event, "Access-Control-Allow-Origin", "*");

  const bunny = useBunny();

  const sections = await bunny<
    {
      Guid: string;
      ObjectName: string;
      Path: string;
      IsDirectory: boolean;
    }[]
  >("//").then((data) =>
    data
      .filter((item) => item.IsDirectory)
      .map((item) => ({
        Guid: item.Guid,
        ObjectName: item.ObjectName,
        Path: item.Path,
      }))
  );

  const data = await Promise.all(
    sections.map(async (section) => {
      const items = await bunny<
        {
          Guid: string;
          ObjectName: string;
          Path: string;
          IsDirectory: boolean;
        }[]
      >(`/${section.ObjectName}/`).then((data) =>
        data
          .filter((item) => !item.IsDirectory)
          .map((item) => ({
            Guid: item.Guid,
            ObjectName: item.ObjectName,
            Path: item.Path,
          }))
      );
      return {
        ...section,
        items,
      };
    })
  );

  return data;
});
