using System;
using YamlDotNet.Serialization;

namespace Sitecore.Demo.Init.Model
{
  public class YamlItemModel
  {
    [YamlMember(Alias = "ID")]
    public Guid ID { get; set; }

    public Guid Parent { get; set; }

    public Guid Template { get; set; }

    public string Path { get; set; }

    public SharedField[] SharedFields { get; set; }

    public Language[] Languages { get; set; }
  }

  public class Language
  {
    [YamlMember(Alias ="Language")]
    public string LanguageLanguage { get; set; }

    public Field[] Fields { get; set; }

    public Version[] Versions { get; set; }
  }

  public class Field
  {
    [YamlMember(Alias = "ID")]
    public Guid Id { get; set; }

    public string Hint { get; set; }

    public string Value { get; set; }
  }

  public class Version
  {
    [YamlMember(Alias = "Version")]
    public long VersionVersion { get; set; }

    public Field[] Fields { get; set; }
  }

  public class SharedField
  {
    [YamlMember(Alias = "ID")]
    public Guid Id { get; set; }

    public string Hint { get; set; }

    public string Value { get; set; }
  }
}