

const faqData = [
    [
        "How much is the shipping cost for pre orders?",
        "If you preorder the same item in a separate transaction, the order number will be different, resulting in an additional shipping charge for the new order number."
    ],
    [
        "Why my order is not shipped?",
        "Please kindly be informed that your order will be shipped on the confirmed release date."
    ],
    [
        "How can I buy a product after its pre-order period?",
        "Most of our products are built-to-order, no extra order can be placed once the pre-order period is over."
    ]
]

function showFaq() {
    let html = "";

    for (let i = 0; i < faqData.length; i++) {
        html += '<div class="question-box">';
        html += '<button class="question-btn" onclick="toggleAnswer(' + i + ')">' + faqData[i][0] + "</button>";
        html += '<div class="answer-text">' + faqData[i][1]+ "</div>";
        html += "</div>";
    }

    document.getElementById("question-list").innerHTML = html;
}


function toggleAnswer(index) {
    const boxes = document.querySelectorAll(".question-box");
    boxes[index].classList.toggle("opened");
}



let chosenTopic = "General";


function pickTopic(button, topic) {
    chosenTopic = topic;

  
    const allButtons = document.querySelectorAll(".topic-btn");
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove("is-on");
    }
    button.classList.add("is-on");
}


document.getElementById("fb-form").onsubmit = function (event) {
    event.preventDefault();
    const form = event.target;

    if (checkForm(form) === false) {
        showFormMsg("fb-msg", "Please correct the form.", "bad");
        return;
    }

    const allFeedback = getSaved("toyhubFeedback");

    allFeedback.push({
        topic: chosenTopic,
        name: form.elements["name"].value,
        email: form.elements["email"].value,
        message: form.elements["message"].value,
        date: new Date().toISOString()
    });

    save("toyhubFeedback", allFeedback);
    form.reset();
    showFormMsg("fb-msg", "Thanks! Your feedback was saved successfully.", "good");
};

showFaq();
