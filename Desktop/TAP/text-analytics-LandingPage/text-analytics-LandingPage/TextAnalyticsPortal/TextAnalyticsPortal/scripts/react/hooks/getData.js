
export const getData = (source, title, typeofdata) => {
  const TopicGrain = source ? source["Topic Grain"] : [];
  const TextGrain = source["Text Grain"];

  let data = [];

  if (TextGrain) {
    let DominantContribList = TextGrain.map((item) => [
      item.Topic_Perc_Contrib,
    ]);

    let max = Math.max(...DominantContribList);

    let Dominant_Topic = TextGrain.find(
      (item) => item.Topic_Perc_Contrib === max
    );

    //To be removed
    function generateSumFromLabel(label, element, part) {
      let sum = 0;

      TopicGrain.forEach((item) => {
        for (const keyword in item[element]) {
          if (label !== keyword) {
            continue;
          }
          sum += item[element][keyword][part];
        }
      });

      return sum;
    }
    function generateSumFromLabelUnknown(label, element, part) {
      let sum = 0;

      TopicGrain.forEach((item) => {
        for (const keyword in item[element][0]) {
          if (label !== keyword) {
            continue;
          }
          sum += item[element][0][keyword][part];
        }
      });

      return sum;
    }

    function generateAverageFromLabelUnknown(label, element, part) {
      let sum = 0;
      let repeatition = 0;

      TopicGrain.forEach((item) => {
        for (const keyword in item[element][0]) {
          if (label !== keyword) {
            continue;
          }

          sum += item[element][0][keyword][part];
          ++repeatition;
        }
      });

      return sum / repeatition;
    }

    function generateAverageFromLabel(label, element, part) {
      let sum = 0;
      let repeatition = 0;

      TopicGrain.forEach((item) => {
        for (const keyword in item[element]) {
          if (label !== keyword) {
            continue;
          }

          sum += item[element][keyword][part];
          ++repeatition;
        }
      });

      return sum / repeatition;
    }

    if (title === "Common Categories") {
      if (TopicGrain) {
        //   let sum = 0;
        //   TopicGrain.forEach((item) => (sum += item.Topic_Perc_Contrib));
        //   card3 = (sum * 100) / TopicGrain.length;
          //TopicGrain.map((item) => (
          //    console.log('common cat', item)));

          data = TopicGrain.map((item) => ({
              "Topic names": item["Topic_name"],
            "Number of comments tagged": item["Number of Responses"],
        }));
      }
    } else if (title === "Bigram-Trigram Topic under Categories") {
      if (TopicGrain) {
        const labels = Array.from(
          new Set(
            TopicGrain.map((item) => [
              ...Object.keys(item["Bigram-Trigram"]),
            ]).flat()
          )
        );
        data = labels.map((name) => ({
            "Bigrams/Trigrams text": name,
            "Weightage (%)": generateAverageFromLabel(name, "Bigram-Trigram", "count"),
        }));
        data.sort((a, b) => (a.value > b.value) ? 1 : -1)

        data = data.slice(1, 6)
      }
    } else if (title === "Word Cloud") {
      if (typeofdata === "Events Data" || typeofdata === "Seeding Data") {
        if (TextGrain) {
          const labels = Array.from(
            new Set(
              TopicGrain.map((item) => [
                ...Object.keys(item["Keywords"]),
              ]).flat()
            )
          );

          data = labels.map((text) => ({
              text,
              value: (generateAverageFromLabel(text, "Keywords", "weight") * 100).toFixed(2),
          }));
          data.sort((a, b) => (a.value > b.value) ? 1 : -1)

          data = data.slice(1, 20)
        }
      } else {
        if (TextGrain) {
          const labels = Array.from(
            new Set(
              TopicGrain.map((item) => [
                ...Object.keys(item["Keywords"][0]),
              ]).flat()
            )
          );

          data = labels.map((text) => ({
            text,
              value:
                  (generateAverageFromLabelUnknown(text, "Keywords", "weight") * 100).toFixed(2),
          }));
          data.sort((a, b) => (a.value > b.value) ? 1 : -1)

         data = data.slice(1, 30)
        }
      }
    } else if (title === "Strongest Topics") {
      if (TopicGrain) {
        data = TopicGrain.map((item) => ({
            "Topic names": item["Topic_name"],
            "Weightage (%)": (item["Topic_Perc_Contrib"] * 100).toFixed(2),
        }));
      }
    } else if (title === "Topic Distribution") {
      if (TopicGrain) {
        if (typeofdata === "Events Data" || typeofdata === "Seeding Data") {
          const labels = Array.from(
            new Set(
              TopicGrain.map((item) => [
                ...Object.keys(item["Keywords"]),
              ]).flat()
            )
            );
            //console.log('labels', labels);
          data = labels.map((name) => ({
              "Keyword text": name,
              "Number of parent topics": generateAverageFromLabel(name, "Keywords", "count"),
              "Weights across the topics (%)": (generateAverageFromLabel(name, "Keywords", "weight") * 100).toFixed(2),
          }));

          data.sort((a, b) => (a.count > b.count) ? 1 : -1)

          data = data.slice(1, 6)
        } else {
            
          const labels = Array.from(
            new Set(
              TopicGrain.map((item) => [
                ...Object.keys(item["Keywords"][0]),
              ]).flat()
            )
            );
            //console.log('labels', labels);
            data = labels.map((name) => ({
                "Keyword text": name,
                "Number of parent topics": generateAverageFromLabelUnknown(name, "Keywords", "count"),
                "Weights across the topics (%)": (generateAverageFromLabelUnknown(name, "Keywords", "weight") * 100).toFixed(2),
          }));
          data.sort((a, b) => (a.count > b.count) ? 1 : -1)

          data = data.slice(1, 6)
        }
      }
    } else if (title === "last Chart") {
      if (TopicGrain) {
        data = TopicGrain.map((item) => ({
            "TopicName": item["Topic_name"],
            "Number of responses": item["Number of Responses"],
            "Topic contribution (%)": (item["Topic_Perc_Contrib"] *100).toFixed(2),
        }));
      }
    } else if (title === "Feedback Comments") {
      if (TextGrain) {
        data = TextGrain.map((item) => ({
          text: item.Text,
          Dominant_Topic_Name: item.Dominant_Topic_Name,
          Topic_Perc_Contrib: (item.Topic_Perc_Contrib * 100).toFixed(2),
        }));
      }
    } else if (title === "All keywords under Category") {
      if (TextGrain) {
        if (typeofdata === "Events Data" || typeofdata === "Seeding Data") {
          const labels = Array.from(
            new Set(
              TopicGrain.map((item) => [
                ...Object.keys(item["Keywords"]),
              ]).flat()
            )
          );
          data = labels.map((keywords) => ({
            keywords,
            countOfId: generateSumFromLabel(keywords, "Keywords", "count"),
            weight: (generateAverageFromLabel(keywords, "Keywords", "weight") * 100).toFixed(2),
          }));
        } else {
          const labels = Array.from(
            new Set(
              TopicGrain.map((item) => [
                ...Object.keys(item["Keywords"][0]),
              ]).flat()
            )
          );
          data = labels.map((keywords) => ({
            keywords,
            countOfId: generateSumFromLabelUnknown(
              keywords,
              "Keywords",
              "count"
            ),
            weight: (generateAverageFromLabelUnknown(
              keywords,
              "Keywords",
              "weight"
            ) * 100).toFixed(2),
          }));
        }
      }
    } else if (title === "Dominant Text") {
      return Dominant_Topic ? Dominant_Topic.Text : "";
    } else if (title === "UnknownCardComponent") {
      let Topic = Dominant_Topic ? Dominant_Topic.Dominant_Topic_Name : "";
        let ContributionScore = Dominant_Topic
            ? (Dominant_Topic.Topic_Perc_Contrib * 100).toFixed(2) + '%'
        : 0;
      return { Topic, ContributionScore };
    }
  }

  return data;
};
