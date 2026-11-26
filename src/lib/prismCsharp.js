// C# syntax highlighting for the code excerpts.
//
// prism-react-renderer ships a small set of Prism languages without C#, so this
// adds a compact C# grammar on top of the C-like one. It colours keywords,
// strings (including $"" and @""), attributes, types and method calls the way
// VS Code's Dark+ theme does. Import it once before rendering any code.
import { Prism } from 'prism-react-renderer'

const KEYWORDS =
  /\b(?:abstract|as|async|await|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|do|double|else|enum|event|explicit|extern|false|finally|fixed|float|for|foreach|get|goto|if|implicit|in|init|int|interface|internal|is|lock|long|nameof|namespace|new|null|object|operator|out|override|params|partial|private|protected|public|readonly|record|ref|required|return|sbyte|sealed|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|uint|ulong|unchecked|unsafe|ushort|using|var|virtual|void|volatile|when|where|while|with|yield)\b/

if (!Prism.languages.csharp) {
  Prism.languages.csharp = Prism.languages.extend('clike', {
    string: [
      // raw string literals: """…""" and $"""…""" (used for SQL)
      { pattern: /\$*"""[\s\S]*?"""/, greedy: true },
      // verbatim and interpolated strings: @"…", $"…", $@"…"
      { pattern: /(?:\$@|@\$|@|\$)"(?:""|\\[\s\S]|[^"\\])*"/, greedy: true },
      { pattern: /"(?:\\.|[^"\\\r\n])*"/, greedy: true },
      { pattern: /'(?:\\.|[^'\\\r\n])'/, greedy: true },
    ],
    keyword: KEYWORDS,
    'class-name': [
      // after declaration keywords and `new`
      { pattern: /(\b(?:class|interface|record|struct|enum|new|is|as|typeof|nameof|where|catch|throw new)\s+)[A-Z]\w*/, lookbehind: true },
      // a type in front of a variable / parameter / property name
      { pattern: /\b[A-Z]\w*(?=(?:<[\w\s,<>?[\]]*>)?\??(?:\[\])?\s+@?[A-Za-z_]\w*\s*[=;,)({])/ },
      // generic arguments: List<Booking>, Dictionary<string, Venue>
      { pattern: /(<|,\s*)[A-Z]\w*(?=[\s,<>?[\]]*>)/, lookbehind: true },
    ],
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:_\d+)*\.?\d*|\B\.\d+)(?:e[+-]?\d+)?[dfmlu]*\b/i,
    operator: /=>|\?\?=?|\?\.|[-+*/%&|^!=<>]=?|&&|\|\||\+\+|--/,
  })

  Prism.languages.insertBefore('csharp', 'class-name', {
    // [HttpGet("{id}")], [Authorize(Roles = "SystemAdmin")]
    attribute: {
      pattern: /^(\s*)\[(?!\])[^\]\r\n]+\](?=\s*$|\s*(?:public|private|protected|internal|\[|\w+\s))/m,
      lookbehind: true,
      inside: {
        'class-name': /(^\[|,\s*)[A-Z]\w*/,
        string: { pattern: /"(?:\\.|[^"\\])*"/ },
        punctuation: /[[\](),=]/,
      },
    },
  })

  Prism.languages.cs = Prism.languages.csharp
}
