
$(document).ready(function () {

  // Display current day 
  var currentDay = dayjs().format('dddd, MMMM D YYYY');
  $('#currentDay').text(currentDay);

  
  var appointmentMessageElement = $('#appointmentMessage');

  var timeBlocksContainer = $('#timeBlocks');

  //Event handler
  timeBlocksContainer.on('click', '.saveBtn', function() {
    var timeBlockId = $(this).closest('.time-block').attr('id');// used to identify the time block. 
    var userInput = $(this).prev('.description').val(); //when user clicks on this saved button all elements within description to be saved to local storage
    localStorage.setItem(timeBlockId, userInput); 

    // Display the appointment message
    appointmentMessageElement.text('Your appointment has been added to local storage!');
  });

  // Load saved user inputs from local storage and display them in the corresponding text areas
  for (var hour = 9; hour <= 17; hour++) {
    var timeBlockId = 'hour-' + hour;
    var savedInput = localStorage.getItem(timeBlockId);

    // If there is saved input, it will be displayed in corresponding area
    if (savedInput !== null) {
      $('#' + timeBlockId + ' .description').val(savedInput);
    }
  }

    // Generate time blocks

  for (var hour = 9; hour <= 17; hour++) {
    var timeId = 'hour-' + hour;
    var timeClass = (hour < dayjs().hour()) ? 'past' : ((hour === dayjs().hour()) ? 'present' : 'future');
    var displayHour = (hour > 12) ? hour - 12 : hour;

    var timeBlock = $('<div>', {
      id: timeId,
      class: 'row time-block ' + timeClass
    });

    timeBlock.append($('<div>', {
      class: 'col-2 col-md-1 hour text-center py-3',
      text: displayHour + ((hour >= 12) ? ' PM' : ' AM') //if else statement 
    }));

    timeBlock.append($('<textarea>', {
      class: 'col-8 col-md-10 description',
      rows: 3
    }));

    timeBlock.append($('<button>', {
      class: 'btn saveBtn col-2 col-md-1',
      'aria-label': 'save',
      html: '<i class="fas fa-save" aria-hidden="true"></i>'
    }));

    timeBlocksContainer.append(timeBlock);
  }

  });
