lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
    //unobserve_entered: true, // <- Avoid executing the function multiple times
    //callback_enter: executeLazyFunction // Assigning the function defined above
});