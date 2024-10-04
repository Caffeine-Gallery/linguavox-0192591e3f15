import Func "mo:base/Func";

import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

actor {
  // Define a type for translation entries
  type TranslationEntry = {
    original: Text;
    translated: Text;
    language: Text;
  };

  // Stable variable to store translation history
  stable var translationHistory : [TranslationEntry] = [];

  // Function to add a translation to the history
  public func addTranslation(original: Text, translated: Text, language: Text) : async () {
    let entry : TranslationEntry = {
      original = original;
      translated = translated;
      language = language;
    };
    translationHistory := Array.append(translationHistory, [entry]);
  };

  // Function to get the translation history
  public query func getTranslationHistory() : async [TranslationEntry] {
    translationHistory
  };

  // Hidden platypus image (base64 encoded)
  private let platypusImage : Text = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==";

  // Function to get the hidden platypus image
  public query func getHiddenPlatypus() : async Text {
    platypusImage
  };
}
