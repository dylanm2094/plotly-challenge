function dropdown(){
    var dropdown = document.getElementById("selDataset");
    d3.json("data/samples.json").then((incomingData) => {
        //console.log(incomingData.samples);
        var ids = incomingData.names;
        //console.log(ids);  
   
        ids.forEach(id_num => {
            var opt = document.createElement('option');
            opt.appendChild(document.createTextNode(id_num));
            opt.value = id_num;
            //console.log(id_num);
            dropdown.appendChild(opt); 
        })
    })
}
dropdown()

function defaultPage(selectID){
    fetchSample(selectID)
    fetchDemo(selectID)
}
defaultPage('940')

function fetchSample(selectID){
    d3.json("data/samples.json").then((incomingData) => {
        function filterIDs(sample) {
            return sample.id === selectID;
        }
        var samples = incomingData.samples;
        var filteredSamples = samples.filter(filterIDs);
        buildBar(filteredSamples)
        buildBubble(filteredSamples)
    })
}

function buildBar(samples){
    var labels = [];
    var values = [];
    var hover = [];
    //console.log(samples);
    if (samples[0].otu_ids.length < 10){
        end = samples[0].otu_ids.length-1
    } else {
        end = 9
    }
    for (i=0;i<=end;i++){
        label = `OTU ${samples[0].otu_ids[i]}`
        labels.push(label)
        values.push(samples[0].sample_values[i])
        hover.push(samples[0].otu_labels[i])
    }
    labels = labels.reverse();
    values = values.reverse();
    hover = hover.reverse();
    //console.log(labels)
    //console.log(values)
    var barTrace = [{
        x: values,
        y: labels,
        text: hover,
        name: "Samples",
        type: "bar",
        orientation: "h"
    }]
    var layout = {
        margin: {
           l: 100,
           r: 100,
           t: 100,
           b: 100
       }
    };
    Plotly.newPlot("bar", barTrace, layout, {responsive: true});
}

function buildBubble(sample) {
    //console.log(sample[0].otu_ids)
    //console.log(sample[0].sample_values)
    var bubbleTrace = {
        x: sample[0].otu_ids,
        y: sample[0].sample_values,
        mode: 'markers',
        marker: {
            size: sample[0].sample_values,
            colorscale: 'Rainbow',
            color: sample[0].otu_ids,
            text: sample[0].otu_labels
        },
    }
    var chartData = [bubbleTrace];
    var layout = {
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
    };
    Plotly.newPlot("bubble", chartData, layout, {responsive: true});
}

function fetchDemo(selectID) {
    d3.json("data/samples.json").then((incomingData) => {
        function filterIDs(demo) {
            return demo.id.toString() === selectID;
        }
        var meta = incomingData.metadata;
        //console.log(meta)
        var filteredDemo = meta.filter(filterIDs);
        buildDemo(filteredDemo)
    })   
}

function buildDemo(meta) {
    var panel = document.getElementById("sample-metadata");
    var id = document.createElement('p');
    id.appendChild(document.createTextNode(`id: ${meta[0].id}`));
    id.value = meta[0].id;
    id.setAttribute("id", "id");

    var eth = document.createElement('p');
    eth.appendChild(document.createTextNode(`ethnicity: ${meta[0].ethnicity}`));
    eth.value = meta[0].ethnicity;
    eth.setAttribute("id", "eth");
        
    var gen = document.createElement('p');
    gen.appendChild(document.createTextNode(`gender: ${meta[0].gender}`));
    gen.value = meta[0].gender;
    gen.setAttribute("id", "gen");

    var age = document.createElement('p');
    age.appendChild(document.createTextNode(`age: ${meta[0].age}`));
    age.value = meta[0].age;
    age.setAttribute("id", "age");

    var loc = document.createElement('p');
    loc.appendChild(document.createTextNode(`location: ${meta[0].location}`));
    loc.value = meta[0].location;
    loc.setAttribute("id", "loc");

    var bb = document.createElement('p');
    bb.appendChild(document.createTextNode(`bbtype: ${meta[0].bbtype}`));
    bb.value = meta[0].bbtype;
    bb.setAttribute("id", "bb");

    var wfeq = document.createElement('p');
    wfeq.appendChild(document.createTextNode(`wfreq: ${meta[0].wfreq}`));
    wfeq.value = meta[0].wfreq;
    wfeq.setAttribute("id", "wfeq");
         
    panel.appendChild(id)
    panel.appendChild(eth)
    panel.appendChild(gen)
    panel.appendChild(age)
    panel.appendChild(loc)
    panel.appendChild(bb)
    panel.appendChild(wfeq)    
}

function updateDemo(selectID) {
    d3.json("data/samples.json").then((incomingData) => {
        function filterIDs(demo) {
            return demo.id.toString() === selectID;
        }
        var metadata = incomingData.metadata;
        //console.log(meta)
        var meta = metadata.filter(filterIDs);
        document.getElementById("id").innerHTML = `id: ${meta[0].id}`;
        document.getElementById("eth").innerHTML = `ethnicity: ${meta[0].ethnicity}`;
        document.getElementById("gen").innerHTML = `gender: ${meta[0].gender}`;
        document.getElementById("age").innerHTML = `age: ${meta[0].age}`;
        document.getElementById("loc").innerHTML = `location: ${meta[0].location}`;
        document.getElementById("bb").innerHTML = `bbtype: ${meta[0].bbtype}`;
        document.getElementById("wfeq").innerHTML = `wfreq: ${meta[0].wfreq}`;
    })
  }

function optionChanged(sampleID) { 
    fetchSample(sampleID)
    updateDemo(sampleID)
}