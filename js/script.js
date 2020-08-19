const selectVal = document.getElementsByTagName("select");

// Create DB
var dbPromise = idb.open("fnleague", 1, function(upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("myteam")) {
    var myteamOS = upgradeDb.createObjectStore("myteam", {
      keypath: "id"
    });
    myteamOS.createIndex("teamName", "teamName", { unique: true });
  }
});

// CRUD : Create
function add() {
  var teamName = selectVal[0].value;
  var id = new Date().getTime();
  if (teamName == "") {
    M.toast({
      html: "<strong>Team not set</strong>",
      classes: "amber lighten-3 brown-text"
    });
  } else {
    // read data
    dbPromise
      .then(function(db) {
        var tx = db.transaction("myteam", "readwrite");
        var store = tx.objectStore("myteam");
        var item = {
          teamName,
          created: id
        };
        store.add(item, id);
        return tx.complete;
      })
      .then(function() {
        read();
        M.toast({
          html: `<strong>${teamName} has been saved</strong>`,
          classes: "green lighten-3 green-text text-darken-4"
        });
      })
      .catch(function() {
        M.toast({
          html: `<strong>${teamName} already exists</strong>`,
          classes: "pink lighten-4 brown-text"
        });
      });
  }
}

// CRUD : Read
function read() {
  var myteam = document.querySelector("#myteam");
  var table = "";
  var i = 1;
  dbPromise
    .then(function(db) {
      var tx = db.transaction("myteam", "readonly");
      var store = tx.objectStore("myteam");
      return store.getAll();
    })
    .then(function(items) {
      items.forEach(item => {
        table += `
          <tr>
            <td width="30" class="center-align"><strong>${i++}.</strong></td>
            <td><strong>${item.teamName}</strong></td>   
            <td>
              <button class="btn-small waves-effect waves-light red" onclick="remove(${
                item.created
              });">
                <input 
                  type="hidden" 
                  id="no${item.created}" 
                  value="${item.created}" 
                />
                Delete
              </button>
            </td>
          </tr>
        `;
      });
      myteam.innerHTML = table;
    });
}

// CRUD : Delete
function remove(id) {
  var stringId = id.toString();
  var deleteVal = document.querySelector("#no" + stringId).attributes.value
    .value;
  dbPromise
    .then(function(db) {
      var tx = db.transaction("myteam", "readwrite");
      var store = tx.objectStore("myteam");
      store.delete(parseInt(deleteVal));
      return tx.complete;
    })
    .then(function() {
      read();
      M.toast({
        html: `<strong>Team has been deleted</strong>`,
        classes: "green lighten-3 green-text text-darken-4"
      });
    });
}
