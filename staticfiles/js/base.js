$(document).ready(function(e) {
    var h = $('nav').height() + 20;
    $('body').animate({ paddingTop: h });
});

function setFooterStyle() {
    var docHeight = $(window).height();
    var footerHeight = $('.footer').outerHeight();
    var footerTop = $('.footer').position().top + footerHeight;
    if (footerTop < docHeight) {
        $('.footer').css('margin-top', (docHeight - footerTop + 'px'));
    } else {
        $('.footer').css('margin-top', '');
    }
    $('.footer').removeClass('invisible');
}

$(document).ready(function() {
    setFooterStyle();
    window.onresize = setFooterStyle;
});
$(document).ready(function() {
    $(".post-body img").each(function() {
        $(this).addClass("img-fluid carousel-image mw-100 mx-auto d-block border border-success");
    })
});
jQuery(function($) {
    if ($(window).width() < 975) {
        $('.dropdown').on('show.bs.dropdown', function(e) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
        });
        $('.dropdown').on('hide.bs.dropdown', function(e) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
        });
        $('.navbar .dropdown > a').click(function() {
            location.href = this.href;
        });
    }
});
$(document).ready(function() {
    window.setTimeout(function() {
        $('.alert').fadeTo(1000, 0).slideUp(1000, function() {
            $(this).remove();
        });
    }, 5000);
});
$(document).ready(function() {
    $(window.location.hash).modal('show');
    $('a[href="#contact-us"]').click(function() {
        window.location.hash = $(this).attr('href');
    });

    function revertToOriginalURL() {
        var original = window.location.href.substr(0, window.location.href.indexOf('#'))
        history.replaceState({}, document.title, original);
    }
    $('.modal').on('hidden.bs.modal', function() {
        revertToOriginalURL();
    });
    $('button[form="contact"]').click(function() {
        revertToOriginalURL();
    });
});
$(document).on('submit', '#subscribe_form', function(e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/subscriber/create/',
        data: {
            email: $('#email').val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(data) {
            if (data.is_taken) {
                $('#email').val('');
                $('*[id^=result]').html("<div class='alert alert-warning fade show' data-alert>Oops ! you're already subscribed. <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a></div>");
            } else if (data.not_verified) {
                $('#email').val('');
                $('*[id^=result]').html("<div class='alert alert-info fade show' data-alert>Oops ! almost there, check your mail for verification.<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a></div>");
            } else {
                $('#email').val('');
                $('*[id^=result]').html("<div class='alert alert-success fade show' data-alert>Thanks for subscribing ! A mail has been sent to you for confirmation. <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a></div>");
            }
        }
    });
});

$(window).on("load", function() {
    $(".loader-wrapper").fadeOut("slow");
});