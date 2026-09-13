<template>
    <footer class="app-footer mt-5 bg-dark text-white border-top border-secondary">

        <div class="container py-4">

            <div class="row align-items-center g-4">

                <!-- Brand -->
                <div class="col-12 col-lg-4">

                    <div class="d-flex align-items-center gap-3">

                        <div
                            class="d-flex align-items-center justify-content-center rounded-4 text-white shadow"
                            style="width: 48px; height: 48px; background: linear-gradient(135deg, #7c3aed, #a855f7);"
                        >
                            <i class="bi bi-chat-heart-fill fs-4"></i>
                        </div>

                        <div>
                            <h5 class="mb-1 fw-bold">
                                Saraha
                            </h5>

                            <p class="mb-0 text-secondary small">
                                Anonymous messages. Real insights.
                            </p>
                        </div>

                    </div>

                </div>


                <!-- Contact Links -->
                <div class="col-12 col-lg-8">

                    <div class="d-flex flex-wrap gap-2 justify-content-lg-end">

                        <!-- Phone -->
                        <a
                            href="tel:01060197730"
                            class="btn btn-outline-light d-flex align-items-center gap-2"
                        >
                            <i class="bi bi-telephone-fill text-primary"></i>
                            <span>01060197730</span>
                        </a>


                        <!-- Email -->
                        <a
                            href="mailto:ezat.mohamed7905@gmail.com"
                            class="btn btn-outline-light d-flex align-items-center gap-2"
                        >
                            <i class="bi bi-envelope-fill text-primary"></i>
                            <span>ezat.mohamed7905@gmail.com</span>
                        </a>


                        <!-- LinkedIn -->
                        <a
                            href="https://www.linkedin.com/in/ezat7"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-outline-light d-flex align-items-center gap-2"
                        >
                            <i class="bi bi-linkedin text-primary"></i>
                            <span>LinkedIn</span>
                        </a>


                        <!-- GitHub -->
                        <a
                            href="https://github.com/ezatmm5572"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-outline-light d-flex align-items-center gap-2"
                        >
                            <i class="bi bi-github"></i>
                            <span>GitHub</span>
                        </a>

                    </div>

                </div>

            </div>


            <!-- Bottom -->
            <div class="border-top border-secondary mt-4 pt-3 text-center text-secondary small">

                © {{ new Date().getFullYear() }} Saraha.
                Built with

                <i class="bi bi-heart-fill text-danger mx-1"></i>

                by

                <span class="text-white fw-semibold">
                    Ezat Mohamed
                </span>

            </div>

        </div>

    </footer>
</template>