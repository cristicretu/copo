export function getRandomLink() {
  let links = [
    "5yx6BWlEVcY",
    "rPjez8z61rI",
    "rZCO-sAtP0I",
    "TfmECBzmOn4",
    "A_hmrykwR7g",
    "7NOSDKb0HlU",
    "C_9FdFnE5hY",
    "wJSg1H8wOUg",
    "qH3fETPsqXU",
    "tNkZsRW7h2c",
    "jfKfPfyJRdk",
  ];
  const randomIndex = Math.floor(Math.random() * 13);

  return links[randomIndex];
}
