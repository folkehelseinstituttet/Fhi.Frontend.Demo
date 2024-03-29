# SCSS example

This SCSS example is a BEM-block. It shows the order and the spacing we use, and how we nest the code, in our projects.

```scss
// Default values for "person"
// NB! Try to keep as much of the styling here as possible!
//     Only breakpoint changes inside @include media-breakpoint-[..]
//     That make it easier to se what will change at any given breakpoint.
.person {
    property: value;

    &__hand {
        property: value;
    }

    &__hand--left {
        property: value;
    }
}

// Values for "hand" only applied to "female"
.person--female {
    .person {
        &__hand {
            property: value;
        }
    }
}

// Values for "person" only applied to mobile
@include media-breakpoint-down(sm) {
    .person {
        property: value;
    }
}

// Values for "person" only applied to breakpoint sm and up
@include media-breakpoint-up(sm) {
    .person {
        property: value;
    }
}

// Values for "person" only applied to breakpoint md and up
@include media-breakpoint-up(md) {
    .person {
        property: value;
    }
}

// etc...

```
