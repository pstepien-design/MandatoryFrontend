const url = 'http://localhost:8080/api/candidates';
const urlParties = 'http://localhost:8080/api/parties';

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    displayCandidates(data);
  })
  .catch((error) => {
    console.log(error);
  });

fetch(urlParties)
  .then((response) => response.json())
  .then((data) => {
    selectParties(data);
  })
  .catch((error) => {
    console.log(error);
  });

function displayCandidates(array) {
  array.forEach((person) => {
    createCandidatesContent(person);
  });
  const buttonPartySelector = document.querySelector('.party__selector');
  const selector = document.querySelector('.form-select');
  let partySelected = 'All';

  buttonPartySelector.addEventListener('click', () => {
    partySelected = selector.value;

    let filteredArray;
    if (partySelected != 'All') {
      document.querySelector('.candidates').innerHTML = '';
      filteredArray = array.filter(
        (person) => person.party.name === partySelected
      );
    } else {
      filteredArray = array;
      console.log(filteredArray);
    }
    console.log(filteredArray);

    filteredArray.forEach((candidate) => {
      createCandidatesContent(candidate);
    });
  });
}

function selectParties(array) {
  const select = document.querySelector('.form-select');
  array.forEach((party) => {
    let option = document.createElement('OPTION');
    option.appendChild(document.createTextNode(party.name));
    select.appendChild(option);
  });
}

const addCandidateButton = document.querySelector('.addcandidate__button');
addCandidateButton.addEventListener('click', () => {
  const nameSetter = document.querySelector('#nameSetter');
  const partyselector = document.querySelector('#partyselector');

  const partyId = partyselector.value;
  const candidateName = nameSetter.value;
  const addCandidate =
    'http://localhost:8080/api/candidates/createCandidate/party/' +
    partyId +
    '/name/' +
    candidateName;
  console.log(addCandidate);

  fetch(addCandidate, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      console.log(response);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});

function createCandidatesContent(candidate) {
  const candidateDiv = document.querySelector('.candidates');
  let singleDiv = document.createElement('div');

  singleDiv.classList.add('candidate');
  let nameParagraph = document.createElement('p');
  let partyParagraph = document.createElement('p');
  let partyLetterParagraph = document.createElement('p');
  let deleteButton = document.createElement('button');
  deleteButton.classList.add('btn');
  deleteButton.classList.add('btn-danger');
  deleteButton.classList.add('deleteCandidateButton');
  deleteButton.appendChild(document.createTextNode('delete'));

  let editButton = document.createElement('button');
  editButton.classList.add('btn');
  editButton.classList.add('btn-primary');
  editButton.classList.add('editCandidateButton');
  editButton.setAttribute('data-bs-toggle', 'modal');
  editButton.setAttribute('data-bs-target', '#editCandidateModal');

  editButton.appendChild(document.createTextNode('edit'));

  nameParagraph.appendChild(document.createTextNode(candidate.name));
  partyParagraph.appendChild(document.createTextNode(candidate.party.name));
  partyLetterParagraph.appendChild(
    document.createTextNode(candidate.party.letter)
  );

  singleDiv.appendChild(nameParagraph);
  singleDiv.appendChild(partyParagraph);
  singleDiv.appendChild(partyLetterParagraph);
  singleDiv.appendChild(deleteButton);
  singleDiv.appendChild(editButton);

  candidateDiv.appendChild(singleDiv);

  deleteButton.addEventListener('click', () => {
    const candidateId = candidate.id;
    const deleteCandidate =
      'http://localhost:8080/api/candidates/deletetCandidate/' + candidateId;

    fetch(deleteCandidate, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const saveEditCandidate = document.querySelector('#saveEditCandidate');

  editButton.addEventListener('click', () => {
    const inputName = document.querySelector('#editNameSetter');
    const selectParty = document.querySelector('#selectParty');
    inputName.defaultValue = candidate.name;
    saveEditCandidate.addEventListener('click', () => {
      const name = inputName.value;
      const candidateid = candidate.id;
      const partyid = selectParty.value;
      const editCandidate =
        'http://localhost:8080/api/candidates/editCandidate/' +
        candidateid +
        '/party/' +
        partyid;

      function editUser(userName) {
        fetch(editCandidate, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: '{"name":"' + userName + '"}',
        })
          .then((response) => {
            console.log(response);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
      editUser(name);
    });
  });
}
$(window).on("load", function(){
  $(".loader-wrapper").fadeOut("slow");
});