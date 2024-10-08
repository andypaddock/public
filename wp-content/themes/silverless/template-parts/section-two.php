<section class="section--two container" id="content">
    <div class="row col-10">
        <h2 class="heading-1 fm-above">
            <?php echo esc_html( get_field('two_title') ); ?>
        </h2>
        <?php if( have_rows('content_blocks') ): ?>
        <ul class="content_blocks">
            <?php while( have_rows('content_blocks') ): the_row(); 
        $image = get_sub_field('image');
        ?>
            <li class="tiled-fm-left rotate-img">
                <?php echo wp_get_attachment_image( $image, 'full' ); ?>
                <div><?php the_sub_field('text'); ?></div>
            </li>
            <?php endwhile; ?>
        </ul>
        <?php endif; ?>
    </div>
</section>