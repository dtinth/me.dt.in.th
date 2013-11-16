---
layout: "post"
permalink: "/page/SpreadsheetToJSONP"
title: "Serve Google Spreadsheet as JSONP (JavaScript)"
preamble: |
  While creating a Live Scoreboard for this year's
  [DJMAX Technika Thailand Championship](http://www.miniarcadethailand.com/technikachampionship.php),
  some of the data (list of participants, offline judge results) are stored on Google Spreadsheets.
  
  I need to find a way to incorporate these data into the web app,
  and I find a __purely client-side__ way to do it.
---





Preparing the Spreadsheet
-------------------------

Create a new sheet in the spreadsheet, call it "JS". And fill in the sheet like this:

<p class="image"><img src="/images/SpreadsheetToJSONP-before.png"></p>

Create a Google Apps Script
---------------------------

Go to _Tools_ -> _Script Editor_ to create a script, paste in this code, and save:

    function onEdit(e) {
      var value = SpreadsheetApp.getActiveSpreadsheet().getSheets()
          .filter(function(sheet) { return sheet.getName() != "JS" })
          .map(function(sheet) {
            return { name: sheet.getName(),
                     values: sheet.getDataRange().getValues() };
          });
      SpreadsheetApp.getActiveSpreadsheet()
        .getSheetByName("JS").getRange("B1").setValue(JSON.stringify(value));
    }

Basically, what is does is this: when the spreadsheet is edited,
the script gets all the sheets, filter out the one named JS,
and create an object representing the sheet and all its values for each sheet.

Finally, these objects are stringified into JSON, and are put on the B1 cell
of the JS sheet.

Make some change, and behold
----------------------------

After you make changes in other sheets, and then switch to the JS sheet,
you will see that the B1 cell we first intentionally left blank at first now contains
the JSON representation of the other sheets.

<p class="image"><img src="/images/SpreadsheetToJSONP-after.png"></p>

Now, what does it look like? A JavaScript code!


Publish the JS sheet
--------------------

Now, we can publish the JS sheet.
Tell it to auto publish so that the data is always fresh.

Then, get the link to the publish data as __TXT (Plain Text)__

<p class="image"><img src="/images/SpreadsheetToJSONP-publish.png"></p>


Include it in your web page!
----------------------------

Since the exported text is a valid JavaScript code, you can now include them
inside your page!

    <script>
    function loadData(sheets) {
      alert(JSON.stringify(sheets));
    }
    </script>
    <script src="https://docs.google.com/spreadsheet/pub?key=...output=txt"></script>

